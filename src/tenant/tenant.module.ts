// tenant.module.ts
import { Module } from '@nestjs/common';
import { TenantService } from './tenant.service';
import { TenantController } from './tenant.controller';
import { Tenant } from '../models/tenant.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { PersonModule } from "../person/person.module"; // Шлях може відрізнятися

@Module({
  imports: [
    TypeOrmModule.forFeature([Tenant]),
    UserModule,
    PersonModule// Імпортуйте UserModule, що містить UserRepository
  ],
  providers: [TenantService],
  controllers: [TenantController],
  exports: [TypeOrmModule.forFeature([Tenant])] // Важливо для доступності репозиторію з інших модулів
})
export class TenantModule {}
