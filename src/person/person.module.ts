import { Module } from '@nestjs/common';
import { PersonService } from './person.service';
import { PersonController } from './person.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Person } from "../models/person.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Person])],
  controllers: [PersonController],
  providers: [PersonService],
  exports: [TypeOrmModule.forFeature([Person]), PersonService]
})
export class PersonModule {}
