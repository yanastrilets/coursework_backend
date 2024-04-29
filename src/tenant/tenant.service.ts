import { Injectable } from '@nestjs/common';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { Tenant } from "../models/tenant.model";
import { Person } from "../models/person.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../models/user.model";

@Injectable()
export class TenantService {
  constructor(
    @InjectRepository(Tenant) private tenantRepository: Repository<Tenant>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Person) private personRepository: Repository<Person>
  ) {}

  async create(createTenantDto: CreateTenantDto): Promise<Tenant> {
    const user = await this.userRepository.findOneBy({ id: createTenantDto.userId });
    if (!user) {
      throw new Error('User not found');
    }
    const person = new Person();
    person.name = createTenantDto.name;
    person.surname = createTenantDto.surname;
    person.date_of_birth = createTenantDto.date_of_birth;
    person.phone = createTenantDto.phone;
    person.email = createTenantDto.email;
    person.passport_info = createTenantDto.passport_info;
    // Save person to the database
    const savedPerson = await this.personRepository.save(person);

    const tenant = new Tenant();
    tenant.user = user;
    tenant.count_of_booking = createTenantDto.count_of_booking;
    tenant.person = savedPerson;

    // Save tenant with the newly created person and existing user
    return this.tenantRepository.save(tenant);
  }

  async findAllFromOneUser(userId: number): Promise<Tenant[]> {
    return this.tenantRepository.find({
      where: { user: { id: userId } },
      relations: ['person'] // Додаємо завантаження пов'язаної особи
    });
  }
  findAll(){
    return this.tenantRepository.find();
  }

  findOne(id: number) {
    return this.tenantRepository.find({where: {id: id}, relations: ['person']});
  }

  update(id: number, updateTenantDto: UpdateTenantDto) {
    return `This action updates a #${id} tenant`;
  }

  remove(id: number) {
    return `This action removes a #${id} tenant`;
  }
}
