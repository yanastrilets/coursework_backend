import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Booking } from "../models/booking.model";
import { Tenant } from "../models/tenant.model";
import { Apartment } from "../models/apartment.model";
import { TenantModule } from "../tenant/tenant.module";
import { ApartmentModule } from "../apartment/apartment.module";

@Module({
  imports: [TypeOrmModule.forFeature([Booking]),
    TenantModule,
    ApartmentModule],
  controllers: [BookingController],
  providers: [BookingService],
  exports: [TypeOrmModule.forFeature([Booking]),
    TenantModule]
})
export class BookingModule {}
