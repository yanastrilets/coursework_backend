import { Module } from '@nestjs/common';
import { ReserveStatusService } from './reserve_status.service';
import { ReserveStatusController } from './reserve_status.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Address } from "../models/address.model";

@Module({
  imports: [TypeOrmModule.forFeature([Address])],
  controllers: [ReserveStatusController],
  providers: [ReserveStatusService],
})
export class ReserveStatusModule {}
