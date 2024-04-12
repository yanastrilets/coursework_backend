import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReserveStatusService } from './reserve_status.service';
import { CreateReserveStatusDto } from './dto/create-reserve_status.dto';
import { UpdateReserveStatusDto } from './dto/update-reserve_status.dto';

@Controller('reserve-status')
export class ReserveStatusController {
  constructor(private readonly reserveStatusService: ReserveStatusService) {}

  @Post()
  create(@Body() createReserveStatusDto: CreateReserveStatusDto) {
    return this.reserveStatusService.create(createReserveStatusDto);
  }

  @Get()
  findAll() {
    return this.reserveStatusService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reserveStatusService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReserveStatusDto: UpdateReserveStatusDto) {
    return this.reserveStatusService.update(+id, updateReserveStatusDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reserveStatusService.remove(+id);
  }
}
