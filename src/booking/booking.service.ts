import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateBookingDto } from "./dto/create-booking.dto";
import { UpdateBookingDto } from "./dto/update-booking.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Tenant } from "../models/tenant.model";
import { Apartment } from "../models/apartment.model";
import { ReserveStatus } from "../models/reserve_status.model";
import { Booking } from "../models/booking.model";
import { Status } from "../models/status";

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Tenant) private tenantRepository: Repository<Tenant>,
    @InjectRepository(Apartment) private apartmentRepository: Repository<Apartment>,
    //@InjectRepository(ReserveStatus) private reserveStatusRepository: Repository<ReserveStatus>,
    @InjectRepository(Booking) private bookingRepository: Repository<Booking>
  ) {
  }

  async create(createBookingDto: CreateBookingDto): Promise<Booking> {

    const tenant = await this.tenantRepository.findOneBy({ id: createBookingDto.tenantId });

    const apartment = await this.apartmentRepository.findOneBy({ id: createBookingDto.apartmentId });

    const booking = new Booking();
    booking.tenant = tenant;
    booking.apartment = apartment;
    booking.status = Status.RESERVED;
    booking.created_at = createBookingDto.created_at;
    booking.check_in = createBookingDto.check_in;
    booking.check_out = createBookingDto.check_out;
    booking.price = createBookingDto.price;
    return this.bookingRepository.save(booking);
  }

  findAll() {
    return this.bookingRepository.find(
      {relations: ['tenant', 'apartment'], }
    );
  }

  findOne(id: number) {
    return this.bookingRepository.find(
      {where: {id: id}, relations: ['apartment']});
  }
  findFromOneUser(id : number){
    return this.bookingRepository.find({where: {tenant: {user: {id:id}}}, relations: ['apartment', 'tenant']});
  }

  async update(id: number) : Promise<Booking> {
    const booking = await this.bookingRepository.findOneBy({ id: id });

    if (!booking) {
      throw new NotFoundException(`Booking with ID ${id} not found`);
    }

    booking.status = Status.REJECTED;

    return this.bookingRepository.save(booking);
  }
  remove(id: number) {
    return `This action removes a #${id} booking`;
  }
  async getReservedDates(apartmentId: number): Promise<{startDate: Date, endDate: Date}[]> {
    const apartment = await this.apartmentRepository.findOneBy({ id: apartmentId });
    if (!apartment) {
      throw new NotFoundException(`Apartment with ID ${apartmentId} not found`);
    }

    const bookings = await this.bookingRepository.find({
      where: {
        apartment: { id: apartmentId },
        status: Status.RESERVED // Перевірте, що у вас є відповідний статус в моделі
      },
      select: ['check_in', 'check_out'] // Вибір тільки необхідних полів
    });

    return bookings.map(booking => ({
      startDate: booking.check_in,
      endDate: booking.check_out
    }));
  }
}
