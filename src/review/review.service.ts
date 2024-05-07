import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { Person } from "../models/person.entity";
import { Repository } from "typeorm";
import { Review } from "../models/review.model";
import { Tenant } from "../models/tenant.model";
import { Apartment } from "../models/apartment.model";
import { User } from "../models/user.model";
import { Booking } from "../models/booking.model";

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review) private readonly reviewRepository: Repository<Review>,

    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Booking) private bookingRepository: Repository<Booking>,
  ) {}
  async create(createReviewDto: CreateReviewDto) : Promise<Review>{

    const user = await this.userRepository.findOneBy({ id: createReviewDto.userId });

    const booking = await this.bookingRepository.findOneBy({ id: createReviewDto.bookingId });
    const review = new Review();
    review.user = user;
    review.booking = booking;
    review.created_at = createReviewDto.created_at;
    review.review = createReviewDto.review;
    return this.reviewRepository.save(review);
  }

  findAll() {
    return this.reviewRepository.find();
  }

  findOne(id: number) {
    return this.reviewRepository.findOneBy({id: id});
  }
  getByBooking(idbook: number) {
    return this.reviewRepository.findOneBy({booking: {id: idbook}});
  }
  findForOneApartment(id: number) {
    return this.reviewRepository.find({where:{ booking: { apartment: { id: id }} }});
  }
  findAllByUserId(userId: number){
    return this.reviewRepository.find({where: {booking: {tenant: {user: {id: userId}}}}})
  }
  findForOneUser(id: number) {
    return this.reviewRepository.find({where:{ user: { id: id } }});
  }

  update(id: number, updateReviewDto: UpdateReviewDto) {
    return `This action updates a #${id} review`;
  }

  remove(id: number) {
    return `This action removes a #${id} review`;
  }
}
