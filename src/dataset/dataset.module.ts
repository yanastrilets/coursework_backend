import { Module } from '@nestjs/common';
import { DatasetService } from './dataset.service';
import { DatasetController } from './dataset.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Dataset } from "./entities/dataset.entity";
import { Landlord } from "../models/landlord.model";
import { Address } from "../models/address.model";
import { Apartment } from "../models/apartment.model";
import { Booking } from "../models/booking.model";
import { Payment } from "../models/payment.model";
import { Refund } from "../models/refund.model";
import { Person } from "../models/person.entity";
import { ReserveStatus } from "../models/reserve_status.model";
import { Review } from "../models/review.model";
import { Tenant } from "../models/tenant.model";
import { User } from "../models/user.model";

@Module({
  imports: [TypeOrmModule.forFeature([Dataset,
    Address, Apartment, Booking, Landlord, Payment, Person, Refund, ReserveStatus,
    Review, Tenant, User])],
  controllers: [DatasetController],
  providers: [DatasetService],
})
export class DatasetModule {}
