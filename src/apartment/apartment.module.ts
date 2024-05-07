import { forwardRef, Module } from "@nestjs/common";
import { ApartmentService } from './apartment.service';
import { ApartmentController } from './apartment.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Apartment} from "../models/apartment.model";
import { LandlordModule } from "../landlord/landlord.module";
import { BookingModule } from "../booking/booking.module";

@Module({
  imports: [TypeOrmModule.forFeature([Apartment]),
    LandlordModule,
    forwardRef(() => BookingModule),
  ],
  controllers: [ApartmentController],
  providers: [ApartmentService],
  exports: [TypeOrmModule.forFeature([Apartment])]
})
export class ApartmentModule {}
