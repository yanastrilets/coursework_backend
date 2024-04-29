import { Module } from '@nestjs/common';
import { ReserveStatusService } from './reserve_status.service';
import { ReserveStatusController } from './reserve_status.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Address } from "../models/address.model";
import { ReserveStatus } from "../models/reserve_status.model";

@Module({
  imports: [TypeOrmModule.forFeature([ReserveStatus])],
  controllers: [ReserveStatusController],
  providers: [ReserveStatusService],
  exports: [TypeOrmModule.forFeature([ReserveStatus])]
})
export class ReserveStatusModule {}
