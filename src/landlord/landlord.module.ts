import { Module } from '@nestjs/common';
import { LandlordService } from './landlord.service';
import { LandlordController } from './landlord.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Landlord } from "../models/landlord.model";
import { PersonModule } from "../person/person.module";

@Module({
  imports: [TypeOrmModule.forFeature([Landlord]),
    PersonModule],
  controllers: [LandlordController],
  providers: [LandlordService],
  exports: [TypeOrmModule.forFeature([Landlord])]
})
export class LandlordModule {}
