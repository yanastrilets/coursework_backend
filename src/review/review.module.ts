import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Review } from "../models/review.model";
import { UserModule } from "../user/user.module";
import { ApartmentModule } from "../apartment/apartment.module";
import { BookingModule } from "../booking/booking.module";

@Module({
  imports: [TypeOrmModule.forFeature([Review]),
  UserModule, BookingModule],
  controllers: [ReviewController],
  providers: [ReviewService],
  exports: [TypeOrmModule.forFeature([Review])]
})
export class ReviewModule {}
