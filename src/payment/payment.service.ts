import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Booking } from "../models/booking.model";
import { Payment } from "../models/payment.model";
import { startOfMonth, subMonths } from 'date-fns';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment) private readonly paymentRepository: Repository<Payment>,

    @InjectRepository(Booking) private bookingRepository: Repository<Booking>,
  ) {}
  async create(createPaymentDto: CreatePaymentDto) : Promise<Payment>{

    const booking = await this.bookingRepository.findOneBy({ id: createPaymentDto.bookingId });
    const payment = new Payment();
    payment.booking = booking;
    payment.created_at = createPaymentDto.created_at;
    payment.sum = booking.price;
    payment.status = "approved";
    return this.paymentRepository.save(payment);
  }

  findAll() {
    return this.paymentRepository.find();
  }
  async getAllPaymentsSummary() {
    const payments = await this.paymentRepository.createQueryBuilder('payment')
      .select("SUM(payment.sum_incomes)", "total")
      .addSelect("TO_CHAR(payment.created_at, 'YYYY-MM')", "month")
      .groupBy("TO_CHAR(payment.created_at, 'YYYY-MM')")
      .orderBy("month")
      .getRawMany();

    return payments;
  }




  findOne(id: number) {
    return this.paymentRepository.find({where : {id:id}});
  }

  update(id: number, updatePaymentDto: UpdatePaymentDto) {
    return `This action updates a #${id} payment`;
  }

  remove(id: number) {
    return `This action removes a #${id} payment`;
  }
}
