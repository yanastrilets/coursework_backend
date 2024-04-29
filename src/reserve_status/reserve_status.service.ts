import { Injectable } from '@nestjs/common';
import { CreateReserveStatusDto } from './dto/create-reserve_status.dto';
import { UpdateReserveStatusDto } from './dto/update-reserve_status.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { ReserveStatus } from "../models/reserve_status.model";
import { Repository } from "typeorm";
import { count } from "rxjs";

@Injectable()
export class ReserveStatusService {
  constructor(
    @InjectRepository(ReserveStatus) private reserveStatusRepository : Repository<ReserveStatus>
  ) {
  }
  create(createReserveStatusDto: CreateReserveStatusDto) {

    return this.reserveStatusRepository.save( {
        reserve_status: createReserveStatusDto.reserve_status,
        count_of: createReserveStatusDto.count_of
    }
    );
  }

  findAll() {
    return this.reserveStatusRepository.find({});
  }

  findOne(id: number) {
    return `This action returns a #${id} reserveStatus`;
  }

  update(id: number, updateReserveStatusDto: UpdateReserveStatusDto) {
    return `This action updates a #${id} reserveStatus`;
  }

  remove(id: number) {
    return `This action removes a #${id} reserveStatus`;
  }
}
