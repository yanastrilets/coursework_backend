import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Payment } from "../models/payment.model";
import { BookingModule } from "../booking/booking.module";
import { UserModule } from "../user/user.module";

@Module({
  imports: [TypeOrmModule.forFeature([Payment]),
  BookingModule, UserModule],
  controllers: [PaymentController],
  providers: [PaymentService],
  exports: [TypeOrmModule.forFeature([Payment])]
})
export class PaymentModule {}
