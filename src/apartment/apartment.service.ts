import {Injectable} from '@nestjs/common';
import {CreateApartmentDto} from './dto/create-apartment.dto';
import {UpdateApartmentDto} from './dto/update-apartment.dto';
import { InjectEntityManager, InjectRepository } from "@nestjs/typeorm";
import {Apartment} from "../models/apartment.model";
import { Between, EntityManager, In, LessThanOrEqual, MoreThanOrEqual, Not, Repository } from "typeorm";
import {Landlord} from "../models/landlord.model";
import {Person} from "../models/person.entity";
import { Address } from "../models/address.model";
import { Booking } from "../models/booking.model";
import { Tenant } from "../models/tenant.model";

import { createObjectCsvWriter } from 'csv-writer';
import { Pool } from 'pg';
import { promisify } from "util";
import * as fs from 'fs';



@Injectable()
export class ApartmentService {
    private pool: Pool;
    constructor(
      @InjectRepository(Apartment) private apartmentRepository: Repository<Apartment>,
      @InjectRepository(Landlord) private landlordRepository: Repository<Landlord>,
      @InjectRepository(Booking) private bookingRepository: Repository<Booking>,
      @InjectEntityManager() private entityManager: EntityManager,

    ) {

        this.pool = new Pool({
            user: 'postgres',
            host: 'localhost',
            database: 'bookin_db',
            password: 'rootroot',
            port: 5432,
        })
    }

    async create(createApartmentDto: CreateApartmentDto) {

        // const person: Person = {
        //     date_of_birth: createApartmentDto.date_of_birth,
        //     email: createApartmentDto.email,
        //     name: createApartmentDto.name,
        //     surname: createApartmentDto.surname,
        //     phone: createApartmentDto.phone,
        //     passport_info: createApartmentDto.passport_info
        // }
        //
        // const landlord: Landlord = {
        //     id: null,
        //     person
        // }
        const landlord = await this.landlordRepository.findOne({where: {id: createApartmentDto.landlordId}});
        const apartment = new Apartment();
        const address = new Address();
        address.country = createApartmentDto.country;
        address.avenue = createApartmentDto.avenue;
        address.city = createApartmentDto.city;
        address.number_of_flat = createApartmentDto.number_of_flat;
        address.number_of_house = createApartmentDto.number_of_house;
        apartment.address = address;
        // apartment.address = {
        //     avenue: createApartmentDto.avenue,
        //     city: createApartmentDto.city,
        //     country: createApartmentDto.country,
        //     number_of_flat: createApartmentDto.number_of_flat,
        //     number_of_house: createApartmentDto.number_of_house
        // }
        apartment.price_per_night = createApartmentDto.price_per_night;
        apartment.count_of_bathroom = createApartmentDto.count_of_bathroom;
        apartment.count_of_kitchen = createApartmentDto.count_of_kitchen
        apartment.count_of_room = createApartmentDto.count_of_room
        apartment.house_name = createApartmentDto.house_name
        apartment.description = createApartmentDto.description
        apartment.landlord = landlord;
        apartment.photos = createApartmentDto.photos;
        apartment.final_price = createApartmentDto.price_per_night*1.1;
        return this.apartmentRepository.save(apartment);
        //{
        //     address: {
        //         avenue: createApartmentDto.avenue,
        //         city: createApartmentDto.city,
        //         country: createApartmentDto.country,
        //         number_of_flat: createApartmentDto.number_of_flat,
        //         number_of_house: createApartmentDto.number_of_house
        //     },
        //     count_of_bathroom: createApartmentDto.count_of_bathroom,
        //     count_of_kitchen: createApartmentDto.count_of_kitchen,
        //     count_of_room: createApartmentDto.count_of_room,
        //     description: createApartmentDto.description,
        //     house_name: createApartmentDto.house_name,
        //     price_per_night: createApartmentDto.price_per_night,
        //     landlord,
        //
        // }

    }
    async findAvailableApartments(minPrice: number, maxPrice: number, city: string, checkIn: Date, checkOut: Date): Promise<Apartment[]> {
        // Спочатку знаходимо всі бронювання, які перетинаються з бажаним діапазоном дат
        const bookings = await this.bookingRepository.find({
            where: {
                check_in: LessThanOrEqual(checkOut),
                check_out: MoreThanOrEqual(checkIn)
            },
            relations: ['apartment'] // Завантажуємо дані про апартаменти
        });

        // Видобуваємо ID апартаментів із цих бронювань
        const bookedApartmentIds = bookings.map(booking => booking.apartment.id);

        // Починаємо будувати запит на отримання апартаментів
        const query = this.apartmentRepository.createQueryBuilder('apartment')
          .leftJoinAndSelect('apartment.address', 'address')
          .where('apartment.price_per_night BETWEEN :minPrice AND :maxPrice', { minPrice, maxPrice });

        // Додаємо умову для фільтрації міста, якщо вибрано конкретне місто (не "All")
        if (city !== "All") {
            query.andWhere('address.city = :city', { city });
        }

        // Враховуємо заброньовані апартаменти
        if (bookedApartmentIds.length > 0) {
            query.andWhere('apartment.id NOT IN (:...bookedApartmentIds)', { bookedApartmentIds });
        }

        // Виконуємо запит і повертаємо результат
        return query.getMany();
    }
    async findAllSorted(sortField: string = "name", sortOrder: "ASC" | "DESC" = "ASC"): Promise<Apartment[]> {
        return this.apartmentRepository.find({
            order: {
                [sortField]: sortOrder
            },
            relations: ['address', 'landlord'] // Залежно від структури вашої бази даних
        });
    }

    async exportApartmentsToCsv(): Promise<string> {
        const client = await this.pool.connect();
        console.log(client);
        try {
            const query = `SELECT * FROM export_apartments_to_csv()`;
            const result = await this.apartmentRepository.query(query);
            console.log(result);
            const path = './data/apartments.csv';
            const csvWriter = createObjectCsvWriter({
                path,
                header: [
                    {id: 'house_name', title: 'HOUSE NAME'},
                    {id: 'description', title: 'DESCRIPTION'},
                    {id: 'landlord_name', title: 'LANDLORD NAME'},
                    {id: 'landlord_surname', title: 'LANDLORD SURNAME'},
                    {id: 'landlord_email', title: 'LANDLORD EMAIL'},
                ]
            });

            await csvWriter.writeRecords(result.rows);
            return path;
        } finally {
            client.release();
        }
    }

    findWithBestRating(){
        return this.apartmentRepository.find({
            order: {
                price_per_night: "ASC"
            },
            take: 5
        });
    }
    findAll() {
        return this.apartmentRepository.find({});
    }


    findOne(id: number) {
        return this.apartmentRepository.findOne({where: {id: id}});
    }

    update(id: number, updateApartmentDto: UpdateApartmentDto) {
        return `This action updates a #${id} apartment`;
    }

    async getInfoApartment() {
        const [apartments] = await Promise.all([this.apartmentRepository
          .createQueryBuilder("apartment")
          .select(["apartment.house_name", "apartment.price_per_night"])
          .leftJoinAndSelect("apartment.landlord", "landlord")
          .leftJoinAndSelect("landlord.person", "person")
          .addSelect(["person.name", "person.surname", "person.email"])
          .getMany()]);
        const filePath =
          "C:\\Users\\yanas_2uo14kh\\WebstormProjects\\coursework_backend\\src\\data.json";
        const writeFileAsync = promisify(fs.writeFile);
        await writeFileAsync(filePath, JSON.stringify(apartments));
        return filePath;
    }

}
