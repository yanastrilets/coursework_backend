import { Injectable } from '@nestjs/common';
import { CreateLandlordDto } from './dto/create-landlord.dto';
import { UpdateLandlordDto } from './dto/update-landlord.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { Person } from "../models/person.entity";
import { Repository } from "typeorm";
import { Landlord } from "../models/landlord.model";
import { Tenant } from "../models/tenant.model";

@Injectable()
export class LandlordService {
  constructor(
    @InjectRepository(Landlord) private landlordRepository: Repository<Landlord>,
    @InjectRepository(Person) private personRepository: Repository<Person>
  ) {
  }
  async create(createLandlordDto: CreateLandlordDto): Promise<Landlord> {
    const person = new Person();
    person.name = createLandlordDto.name;
    person.surname = createLandlordDto.surname;
    person.date_of_birth = createLandlordDto.date_of_birth;
    person.phone = createLandlordDto.phone;
    person.email = createLandlordDto.email;
    person.passport_info = createLandlordDto.passport_info;
    // Save person to the database
    const savedPerson = await this.personRepository.save(person);

    const landlord = new Landlord();
    landlord.person = savedPerson;

    // Save landlord with the newly created person and existing user
    return this.landlordRepository.save(landlord);
  }

  findAll() {
    return this.landlordRepository.find();
  }
  async findAllLandlordsSorted(sortField: string = "name", sortOrder: "ASC" | "DESC" = "ASC"): Promise<Landlord[]> {
    return this.landlordRepository.find({
      order: {
        person: {
          [sortField]: sortOrder
        }
      }, relations: ["person"]
    });
  }
  findOne(id: number) {
    return this.landlordRepository.findOne({where: {id: id}});
  }

  update(id: number, updateLandlordDto: UpdateLandlordDto) {
    return `This action updates a #${id} landlord`;
  }

  remove(id: number) {
    return `This action removes a #${id} landlord`;
  }
}
