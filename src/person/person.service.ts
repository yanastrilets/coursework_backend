import { Injectable } from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { InjectRepository } from "@nestjs/typeorm";
import {Person} from "../models/person.entity";
import { Repository } from 'typeorm';

@Injectable()
export class PersonService {
  constructor(
    @InjectRepository(Person) private readonly personRepository: Repository<Person>,
  ) {}
  create(createPersonDto: CreatePersonDto): Promise<Person> {
    const person = new Person();
    person.name = createPersonDto.name;
    person.surname = createPersonDto.surname;
    person.date_of_birth = createPersonDto.date_of_birth;
    person.phone = createPersonDto.phone;
    person.email = createPersonDto.email;
    return this.personRepository.save(person);
  }

  findAllPerson() : Promise<Person[]> {
    return this.personRepository.find();
  }

  findOne(id: number) {
    return this.personRepository.findOneBy({ id });

  }

  update(id: number, updatePersonDto: UpdatePersonDto) : Promise<Person> {
    const person = new Person();
    person.name = updatePersonDto.name;
    person.surname = updatePersonDto.surname;
    person.date_of_birth = updatePersonDto.date_of_birth;
    person.phone = updatePersonDto.phone;
    person.email = updatePersonDto.email;
    return this.personRepository.save(person);
  }

  remove(id: number): Promise<{ affected?: number }> {
    return this.personRepository.delete(id);
  }
}
