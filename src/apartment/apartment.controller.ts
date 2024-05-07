import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpStatus,
  HttpException, StreamableFile, Res, Header
} from "@nestjs/common";
import { ApartmentService } from './apartment.service';
import { CreateApartmentDto } from './dto/create-apartment.dto';
import { UpdateApartmentDto } from './dto/update-apartment.dto';
import { Tenant } from "../models/tenant.model";
import { Apartment } from "../models/apartment.model";
import { Readable} from "typeorm/browser/platform/BrowserPlatformTools";
import { join } from 'path';
import { createReadStream, promises as fsPromises } from 'fs';
import { Response } from 'express';
import * as fs from "fs";
import {promisify} from 'util'
@Controller('apartment')
export class ApartmentController {
  constructor(private readonly apartmentService: ApartmentService) {}

  @Post()
  create(@Body() createApartmentDto: CreateApartmentDto) {
    return this.apartmentService.create(createApartmentDto);
  }

  @Get()
  findAll() {
    return this.apartmentService.findAll();
  }
  @Get('/sorted')
  findAllFromOneUser(
    @Query('sortField') sortField: string = 'house_name',
    @Query('sortOrder') sortOrder: 'ASC' | 'DESC' = 'ASC'  // Значення за замовчуванням
  ): Promise<Apartment[]> {
    return this.apartmentService.findAllSorted(sortField, sortOrder);
  }

  @Get('/rating')
  findByBestRating() {
    return this.apartmentService.findWithBestRating();
  }
  @Get('/available')
  findAvailableApartments(
    @Query('minPrice') minPrice: number,
    @Query('maxPrice') maxPrice: number,
    @Query('city') city: string,
    @Query('checkIn') checkIn: string,
    @Query('checkOut') checkOut: string
  ) {
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    return this.apartmentService.findAvailableApartments(minPrice, maxPrice, city, checkInDate, checkOutDate);
  }

  @Get('/export')
  async exportApartments(@Res() res: Response) {
    const filePath = await this.apartmentService.exportApartmentsToCsv();
    res.download(filePath);
  }

  private toCSV(data: any[]): string {
    if (!data || data.length === 0) {
      return '';
    }

    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(row => {
      return Object.values(row).map(field => {
        if (field === null || field === undefined) return '';
        if (typeof field === 'string') return `"${field.replace(/"/g, '""')}"`;
        return String(field);
      }).join(',');
    }).join('\n');

    return `${headers}\n${rows}`;
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() updateApartmentDto: UpdateApartmentDto) {
    return this.apartmentService.update(+id, updateApartmentDto);
  }

  @Get('/download')
  @Header('Content-Type', 'application/json')
  @Header('Content-Disposition', 'attachment; filename="package.json"')
  async downloadJSON() {

    const filePath = await this.apartmentService.getInfoApartment();
    const file = fs.createReadStream(filePath);
    return new StreamableFile(file);
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.apartmentService.findOne(+id);
  }
}
