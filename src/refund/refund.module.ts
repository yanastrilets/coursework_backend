import { Module } from '@nestjs/common';
import { RefundService } from './refund.service';
import { RefundController } from './refund.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Refund } from "../models/refund.model";
import { BookingModule } from "../booking/booking.module";
import { UserModule } from "../user/user.module";

@Module({
  imports: [TypeOrmModule.forFeature([Refund]),
    BookingModule,
    UserModule],
  controllers: [RefundController],
  providers: [RefundService],
  exports: [TypeOrmModule.forFeature([Refund]), BookingModule, UserModule]
})
export class RefundModule {}
