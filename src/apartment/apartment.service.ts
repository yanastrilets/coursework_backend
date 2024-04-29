import {Injectable} from '@nestjs/common';
import {CreateApartmentDto} from './dto/create-apartment.dto';
import {UpdateApartmentDto} from './dto/update-apartment.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Apartment} from "../models/apartment.model";
import {Repository} from "typeorm";
import {Landlord} from "../models/landlord.model";
import {Person} from "../models/person.entity";

@Injectable()
export class ApartmentService {
    constructor(
        @InjectRepository(Apartment) private apartmentRepository: Repository<Apartment>,
        @InjectRepository(Landlord) private landlordRepository: Repository<Landlord>,
    ) {
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
        apartment.address.country = createApartmentDto.country;
        apartment.address.avenue = createApartmentDto.avenue;
        apartment.address.city = createApartmentDto.city;
        apartment.address.number_of_flat = createApartmentDto.number_of_flat;
        apartment.address.number_of_house = createApartmentDto.number_of_house;
        // apartment.address = {
        //     avenue: createApartmentDto.avenue,
        //     city: createApartmentDto.city,
        //     country: createApartmentDto.country,
        //     number_of_flat: createApartmentDto.number_of_flat,
        //     number_of_house: createApartmentDto.number_of_house
        // }
        apartment.count_of_bathroom = createApartmentDto.count_of_bathroom;
        apartment.count_of_kitchen = createApartmentDto.count_of_kitchen
        apartment.count_of_room = createApartmentDto.count_of_room
        apartment.house_name = createApartmentDto.house_name
        apartment.description = createApartmentDto.description
        apartment.landlord = landlord;
        apartment.photos = createApartmentDto.photos;
        return this.apartmentRepository.save(apartment
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
        );
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

    remove(id: number) {
        return `This action removes a #${id} apartment`;
    }
}
