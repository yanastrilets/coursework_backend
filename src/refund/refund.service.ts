import { Injectable } from '@nestjs/common';
import { CreateRefundDto } from './dto/create-refund.dto';
import { UpdateRefundDto } from './dto/update-refund.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { Review } from "../models/review.model";
import { Repository } from "typeorm";
import { User } from "../models/user.model";
import { Apartment } from "../models/apartment.model";
import { Booking } from "../models/booking.model";
import { Refund } from "../models/refund.model";

@Injectable()
export class RefundService {
  constructor(
    @InjectRepository(Refund) private readonly refundRepository: Repository<Refund>,

    @InjectRepository(Booking) private bookingRepository: Repository<Booking>,

    @InjectRepository(User) private userRepository: Repository<User>

  ) {}
  async create(createRefundDto: CreateRefundDto):Promise<Refund> {
    const booking = await this.bookingRepository.findOneBy({ id: createRefundDto.bookingId });

    const refund = new Refund();
    refund.created_at = createRefundDto.created_at;
    refund.booking = booking;
    refund.sum = booking.price * 0.95;
    return this.refundRepository.save(refund);
  }

  findAll() {
    return this.refundRepository.find();
  }

  findOne(id: number) {
    return this.refundRepository.findOneBy({id:id});
  }
  findAllFromOneUser(id:number) {
    return this.refundRepository.find({where :{booking: {tenant: {user: {id:id}}}}})
  }

  update(id: number, updateRefundDto: UpdateRefundDto) {
    return `This action updates a #${id} refund`;
  }

  remove(id: number) {
    return `This action removes a #${id} refund`;
  }
}
