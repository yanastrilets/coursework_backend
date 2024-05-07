import { Controller, Get, Post, Body, Patch, Param, Delete, Header } from "@nestjs/common";
import { DatasetService } from './dataset.service';
import { CreateDatasetDto } from './dto/create-dataset.dto';
import { UpdateDatasetDto } from './dto/update-dataset.dto';

@Controller('dataset')
export class DatasetController {
  constructor(private readonly datasetService: DatasetService) {}



  @Get()
  generateData() {
    return this.datasetService.generateData();
  }
}
