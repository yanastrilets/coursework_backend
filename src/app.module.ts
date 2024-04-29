import { Module } from '@nestjs/common';
import { Address } from "./models/address.model";
import { Apartment } from "./models/apartment.model";
import { Booking } from "./models/booking.model";
import { Landlord } from "./models/landlord.model";
import { Payment } from "./models/payment.model";
import { Person } from "./models/person.entity";
import { Refund } from "./models/refund.model";
import { ReserveStatus } from "./models/reserve_status.model";
import { Review } from "./models/review.model";
import { Tenant } from "./models/tenant.model";
import { User } from "./models/user.model";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ApartmentModule } from './apartment/apartment.module';
import { UserModule } from './user/user.module';
import { PersonModule } from './person/person.module';
import { AddressModule } from './address/address.module';
import { ReserveStatusModule } from './reserve_status/reserve_status.module';
import { TenantModule } from './tenant/tenant.module';
import { AuthModule } from './auth/auth.module';
import {JwtModule} from "@nestjs/jwt";
import {jwtConstants} from "./auth/auth.service";
import { BookingModule } from './booking/booking.module';
import { LandlordModule } from './landlord/landlord.module';
import { PaymentModule } from './payment/payment.module';
import { ReviewModule } from './review/review.module';
import { RefundModule } from './refund/refund.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'rootroot',
      database: 'bookin_db',
      entities: [Address, Apartment, Booking, Landlord, Payment, Person, Refund, ReserveStatus, Review, Tenant, User],
      synchronize: true,
    }),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60m' },
    }),
    ApartmentModule,
    UserModule,
    PersonModule,
    AddressModule,
    ReserveStatusModule,
    TenantModule,
    AuthModule,
    BookingModule,
    LandlordModule,
    PaymentModule,
    ReviewModule,
    RefundModule,
  ],
})
export class AppModule {}
