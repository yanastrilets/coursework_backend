import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from "@nestjs/common";
import { TenantService } from './tenant.service';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { Tenant } from "../models/tenant.model";

@Controller('tenant')
export class TenantController {
  constructor(private readonly tenantService: TenantService) {}

  @Post()
  create(@Body() createTenantDto: CreateTenantDto) {
    return this.tenantService.create(createTenantDto);
  }

  @Get()
  findAll() {
    return this.tenantService.findAll();
  }
  @Get('/user/:id')
  findAllFromOneUser(
    @Param('id') userId: number,
    @Query('sortField') sortField: string = 'name',  // Значення за замовчуванням
    @Query('sortOrder') sortOrder: 'ASC' | 'DESC' = 'ASC'  // Значення за замовчуванням
  ): Promise<Tenant[]> {
    return this.tenantService.findAllFromOneUser(userId, sortField, sortOrder);
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tenantService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTenantDto: UpdateTenantDto) {
    return this.tenantService.update(+id, updateTenantDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tenantService.remove(+id);
  }
}
