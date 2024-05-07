import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from "@nestjs/common";
import { LandlordService } from './landlord.service';
import { CreateLandlordDto } from './dto/create-landlord.dto';
import { UpdateLandlordDto } from './dto/update-landlord.dto';
import { Apartment } from "../models/apartment.model";
import { Landlord } from "../models/landlord.model";

@Controller('landlord')
export class LandlordController {
  constructor(private readonly landlordService: LandlordService) {}

  @Post()
  create(@Body() createLandlordDto: CreateLandlordDto) {
    return this.landlordService.create(createLandlordDto);
  }

  @Get()
  findAll() {
    return this.landlordService.findAll();
  }
  @Get('/sorted')
  findAllSorted(
    @Query('sortField') sortField: string = 'name',
    @Query('sortOrder') sortOrder: 'ASC' | 'DESC' = 'ASC'  // Значення за замовчуванням
  ): Promise<Landlord[]> {
    return this.landlordService.findAllLandlordsSorted(sortField, sortOrder);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.landlordService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLandlordDto: UpdateLandlordDto) {
    return this.landlordService.update(+id, updateLandlordDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.landlordService.remove(+id);
  }
}
