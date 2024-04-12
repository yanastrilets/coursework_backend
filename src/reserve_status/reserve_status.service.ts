import { Injectable } from '@nestjs/common';
import { CreateReserveStatusDto } from './dto/create-reserve_status.dto';
import { UpdateReserveStatusDto } from './dto/update-reserve_status.dto';

@Injectable()
export class ReserveStatusService {
  create(createReserveStatusDto: CreateReserveStatusDto) {
    return 'This action adds a new reserveStatus';
  }

  findAll() {
    return `This action returns all reserveStatus`;
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
