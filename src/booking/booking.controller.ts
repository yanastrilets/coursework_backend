import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  create(@Body() createBookingDto: CreateBookingDto) {
    return this.bookingService.create(createBookingDto);
  }

  @Get()
  findAll() {
    return this.bookingService.findAll();
  }

  @Patch('/reject/:id')
  update(@Param('id') id: string) {
    return this.bookingService.update(+id);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookingService.findOne(+id);
  }
  @Get(':id/reserved-dates')
  getReservedDates(@Param('id') id: number) {
    return this.bookingService.getReservedDates(id);
  }
  @Get('user/:id')
  getAllFromOneUser(@Param('id') id: number) {
    return this.bookingService.findFromOneUser(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookingService.remove(+id);
  }
}
