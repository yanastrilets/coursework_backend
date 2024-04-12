import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAddressDto } from './dto/create-address.dto';
import { Address } from '../models/address.model';
import { Repository } from 'typeorm';
import { UpdateAddressDto } from "./dto/update-address.dto";

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address) private readonly addressRepository: Repository<Address>,
  ) {}

  create(createAddressDto: CreateAddressDto): Promise<Address> {
    const newAddress = new Address();
    newAddress.avenue = createAddressDto.avenue;
    newAddress.number_of_house = createAddressDto.number_of_house;
    newAddress.number_of_flat = createAddressDto.number_of_flat;
    newAddress.city = createAddressDto.city;
    newAddress.country = createAddressDto.country;

    return this.addressRepository.save(newAddress);
  }

  findAll(): Promise<Address[]> {
    return this.addressRepository.find();
  }

  findOne(id: number): Promise<Address | undefined> {
    return this.addressRepository.findOneBy({ id });
  }

  update(id: number, updateAddressDto: UpdateAddressDto): Promise<Address> {
    const address = new Address();
    address.avenue = updateAddressDto.avenue;
    address.number_of_house = updateAddressDto.number_of_house;
    address.number_of_flat = updateAddressDto.number_of_flat;
    address.city = updateAddressDto.city;
    address.country = updateAddressDto.country;
    return this.addressRepository.save(address);
  }

  remove(id: number): Promise<{ affected?: number }> {
    return this.addressRepository.delete(id);
  }
}
