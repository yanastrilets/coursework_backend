import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Apartment } from "../models/apartment.model";
import { Address } from "../models/address.model";
import { Repository } from "typeorm";
import { Booking } from "../models/booking.model";
import { Landlord } from "../models/landlord.model";
import { Payment } from "../models/payment.model";
import { Refund } from "../models/refund.model";
import { ReserveStatus } from "../models/reserve_status.model";
import { Review } from "../models/review.model";
import { Tenant } from "../models/tenant.model";
import { User } from "../models/user.model";
import { Person } from "../models/person.entity";
import { faker } from "@faker-js/faker";
import * as fs from "fs";
import * as csv from "csv-parser";
import { Status } from "../models/status";

@Injectable()
export class DatasetService {
  constructor(
    @InjectRepository(Apartment) private readonly apartmentRepository: Repository<Apartment>,
    @InjectRepository(Address) private readonly addressRepository: Repository<Address>,
    @InjectRepository(Booking) private readonly bookingRepository: Repository<Booking>,
    @InjectRepository(Landlord) private readonly landlordRepository: Repository<Landlord>,
    @InjectRepository(Payment) private readonly paymentRepository: Repository<Payment>,
    @InjectRepository(Person) private readonly personRepository: Repository<Person>,
    @InjectRepository(Refund) private readonly refundRepository: Repository<Refund>,
    @InjectRepository(ReserveStatus) private readonly statusRepository: Repository<ReserveStatus>,
    @InjectRepository(Review) private readonly reviewRepository: Repository<Review>,
    @InjectRepository(Tenant) private readonly tenantRepository: Repository<Tenant>,
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {
  }

  async generateData() {
    //юзер
    const userCount = 1000;
    const users = [];
    for (let i = 0; i < userCount; ++i) {
      const user = await this.userRepository.save({
        username: faker.internet.userName(),
        password: faker.internet.password(8),
        role: 0
      });
      users.push(user);
    }
    const admin = 1;
    await this.userRepository.save({
      username: "admin",
      password: "88888888",
      role: 1
    });
    const tenantCount = 2000;
    const person_tenants = 2000;
    const persons = [];

    for (let i = 0; i < person_tenants; ++i) {
      const person = await this.personRepository.save({
        name: faker.name.firstName(),
        surname: faker.name.lastName(),
        phone: faker.phone.number(),
        email: faker.internet.email(),
        date_of_birth: faker.date.birthdate(),
        passport_info: generatePassportInfo()
      });
      persons.push(person);
    }

    let remainingTenants = tenantCount - userCount;
    for (const user of users) {
      if (persons.length > 0) {
        const personIndex = Math.floor(Math.random() * persons.length);
        const person = persons.splice(personIndex, 1)[0];
        await this.tenantRepository.save({
          user: user,
          person: person
        });

        const additionalTenants = Math.min(2, Math.floor(Math.random() * 4));

        for (let j = 0; j < additionalTenants && remainingTenants > 0; j++) {
          if (persons.length > 0) {
            const additionalPersonIndex = Math.floor(Math.random() * persons.length);
            const additionalPerson = persons.splice(additionalPersonIndex, 1)[0];
            await this.tenantRepository.save({
              user: user,
              person: {
                name: faker.name.firstName(),
                surname: faker.name.lastName(),
                phone: faker.phone.number(),
                email: faker.internet.email(),
                date_of_birth: faker.date.birthdate(),
                passport_info: generatePassportInfo()
              },
              count_of_booking: 0
            });
            remainingTenants--;
          }
        }
      }
    }

    try {
      const dataService = new DataService();
      const apartmentDataArray = await dataService.processApartmentData();
      //const apartmentDataArray = await this.readApartmentData();
      console.log(apartmentDataArray);
      //const createdApartments = [];
      for (const item of apartmentDataArray) {
        let landlord = await this.checkLandlordExistence(item);
        if (!landlord) {
          landlord = await this.landlordRepository.save({
            person: {

              name: faker.name.firstName(),
              surname: faker.name.lastName(),
              phone: faker.phone.number(),
              email: faker.internet.email(),
              date_of_birth: faker.date.birthdate(),
              passport_info: generatePassportInfo()
            },

            host_id: item["Host ID"]
          });
        }

        const description = item.Name + "\n" + "Neighbourhood: " + item.Neighbourhood;
        const apartment = await this.apartmentRepository.save({
          address: {
            city: item.City,
            avenue: faker.location.street(),
            number_of_house: faker.datatype.number({ min: 1, max: 300 }),
            number_of_flat: faker.datatype.number({ min: 1, max: 300 }),
            country: item.Country.toString()
          },
          price_per_night: item["Room Price"],
          description: description,
          house_name: generateHouseName(),
          landlord: landlord,
          final_price: item["Room Price"] * 1.1,
          count_of_room: item["Rooms rent by the host"],
          count_of_kitchen: faker.datatype.number({ min: 1, max: 3 }),
          count_of_bathroom: faker.datatype.number({ min: 1, max: 5 })
        });
        const numberOfBookings = faker.datatype.number({ min: 0, max: 5 });  // Випадкова кількість букінгів від 0 до 5
        for (let i = 0; i < numberOfBookings; i++) {
          const tenant = await this.tenantRepository
            .createQueryBuilder("tenant")
            .orderBy("RANDOM()")
            .getOne();

          if (tenant) {
            let check_in, check_out, duration;
            let isValidDate = false;
            let attempts = 0;

            // Спробуємо знайти валідні дати
            while (!isValidDate && attempts < 10) {
              const now = new Date();
              const pastDate = new Date(now);
              const futureDate = new Date(now);
              pastDate.setDate(now.getDate() - faker.datatype.number({ min: 15, max: 365 }));
              futureDate.setDate(now.getDate() + faker.datatype.number({ min: 15, max: 365 }));

              const bookingType = ["past", "present", "future"][Math.floor(Math.random() * 3)];
              switch (bookingType) {
                case "past":
                  check_in = new Date(pastDate.setDate(pastDate.getDate() - faker.datatype.number({
                    min: 2,
                    max: 14
                  })));
                  break;
                case "present":
                  check_in = new Date();
                  break;
                case "future":
                  check_in = new Date(futureDate);
                  break;
              }

              duration = faker.datatype.number({ min: 2, max: 14 });
              check_out = new Date(check_in.getTime() + duration * 24 * 60 * 60 * 1000);

              // Перевірка на доступність дат
              const reservedDates = await this.getReservedDates(apartment.id);
              const isOverlapping = reservedDates.some(d =>
                (check_in < d.endDate && check_in >= d.startDate) ||
                (check_out > d.startDate && check_out <= d.endDate)
              );

              if (!isOverlapping) {
                isValidDate = true;
              } else {
                attempts++;
              }
            }
            const created_at = new Date(check_in.getTime() - faker.datatype.number({
              min: 1,
              max: 30
            }) * 24 * 60 * 60 * 1000);

            if (isValidDate) {
              let isReject;
              let status_b = Status.RESERVED;
              if (check_in > new Date() && Math.random() < 0.15) {
                isReject = true;
                status_b = Status.REJECTED;
              }
              if (check_in <= new Date() && check_out >= new Date()) {
                status_b = Status.IN_USE;
              }
              if (check_out < new Date()) {
                status_b = Status.COMPLETED;
              }

              const booking = await this.bookingRepository.save({
                apartment: apartment,
                tenant: tenant,
                check_in: check_in,
                check_out: check_out,
                created_at: created_at,
                price: duration * apartment.final_price,
                status: status_b
              });
              await this.paymentRepository.save({
                booking: booking,
                created_at: created_at,
                sum: booking.price,
                sum_incomes: booking.price*0.09,
                status: "approved"
              });
              if (isReject) {
                const rejectedBooking = await this.refundRepository.save({
                  created_at: created_at,
                  sum: booking.price * 0.95,
                  booking: booking
                });
              }
              const tenantWithUser = await this.tenantRepository.findOne({
                where: { id: tenant.id },
                relations: ['user'] // Припускаючи, що у вашій моделі Tenant є властивість user, що відноситься до User
              });
              if((status_b == Status.IN_USE || status_b == Status.COMPLETED) && Math.random() < 0.55){
                let rev = faker.datatype.number({min:2, max: 5});
                const review = this.reviewRepository.save({
                  booking: booking,
                  review: rev,
                  user: tenantWithUser.user,
                  created_at: created_at
                });
              }

            }
          }
        }
        console.log(item);
      }
      const status_0 = await this.bookingRepository.countBy({status: Status.RESERVED});
      const status_1 = await this.bookingRepository.countBy({status: Status.IN_USE});
      const status_2 = await this.bookingRepository.countBy({status: Status.COMPLETED});
      const status_3 = await this.bookingRepository.countBy({status: Status.REJECTED});
      await this.statusRepository.save({
        reserve_status: "RESERVED",
        count_of: status_0
      });
      await this.statusRepository.save({
        reserve_status: "IN_USE",
        count_of: status_1
      });
      await this.statusRepository.save({
        reserve_status: "COMPLETED",
        count_of: status_2
      });
      await this.statusRepository.save({
        reserve_status: "REJECTED",
        count_of: status_3
      });

    } catch (error) {
      console.error("Error processing apartments:", error);
    }

    //this.readApartmentDataTest()
    function generatePassportInfo(): string {
      const letters = faker.datatype.string(2).replace(/[0-9]/g, "").toUpperCase().slice(0, 2); // Забезпечення, що це великі літери
      const numbers = faker.datatype.number({ min: 10000000, max: 99999999 }).toString(); // Генерація 8 цифр
      return letters + numbers;
    }

    function parseAddress(address) {
      const parts = address.split(",").map(part => part.trim()); // Розділяємо рядок за комами і видаляємо зайві пробіли
      return {
        country: parts[0],
        city: parts[1],
        district: parts[2]
      };
    }

    function getRandomElement(array) {
      return array[Math.floor(Math.random() * array.length)];
    }

    function generateHouseName() {
      const adjectives = ["Cozy", "Sunny", "Rustic", "Lovely", "Peaceful", "Charming"];
      const nouns = ["Cottage", "Retreat", "House", "Villa", "Mansion", "Hideaway"];
      const adjective = getRandomElement(adjectives);
      const noun = getRandomElement(nouns);
      const number = Math.floor(Math.random() * 900) + 100; // Генерує випадкове число від 100 до 999

      return `${adjective} ${noun} ${number}`;
    }



    //this.readApartmentDataTest();
  }
  async getReservedDates(apartmentId: number): Promise<{ startDate: Date, endDate: Date }[]> {
    const apartment = await this.apartmentRepository.findOneBy({ id: apartmentId });
    if (!apartment) {
      throw new NotFoundException(`Apartment with ID ${apartmentId} not found`);
    }

    const bookings = await this.bookingRepository.find({
      where: {
        apartment: { id: apartmentId },
        status: Status.RESERVED // Перевірте, що у вас є відповідний статус в моделі
      },
      select: ["check_in", "check_out"] // Вибір тільки необхідних полів
    });

    return bookings.map(booking => ({
      startDate: booking.check_in,
      endDate: booking.check_out
    }));
  }

  async checkLandlordExistence(item) {
    const landlord = await this.landlordRepository.findOne({
      where: { host_id: item['Host ID'] }  // Перевірка по `id` лендлорда.
    });

    return landlord ? landlord : null;  // Повертає об'єкт лендлорда, якщо знайдено; інакше повертає null.
  }

  private async readApartmentData(): Promise<any> {
    const results = [];
    const maxRecords = 3;
    let counter = 0;

    return new Promise((resolve, reject) => {
      const fileStream = fs.createReadStream("air-bnb-listings-austria.csv");

      fileStream
        .pipe(csv({ separator: ";" }))
        .on("data", (data) => {
          if (counter < maxRecords) {
            results.push(data);
            console.log(results);
            counter++;
          }
          if (counter >= maxRecords) {
            fileStream.destroy();
          }
        })
        .on("end", () => {
          console.log(results);
          resolve(results);
        })
        .on("error", (err) => {
          console.error("Error reading file:", err);
          reject(err);
        });
    });
  }

  async readApartmentDataTest() {
    const maxRecords = 10;
    let counter = 0;

    const fileStream = fs.createReadStream("air-bnb-listings-austria.csv");

    fileStream
      .pipe(csv({ separator: ";" }))
      .on("data", (data) => {
        if (counter < maxRecords) {
          console.log(data);  // Виведення кожного запису в консоль
          counter++;
        }
        if (counter >= maxRecords) {
          fileStream.destroy();  // Закриття файлового потоку
        }
      })
      .on("end", () => {
        console.log("Completed reading the file with max records shown.");  // Сповіщення про завершення читання файлу
      })
      .on("error", (err) => {
        console.error("Error while reading the file:", err);  // Виведення помилки, якщо така виникає
      });
  }

}


class DataService {
  private filePath: string;

  constructor() {
    this.filePath = "air-bnb-listings-less.csv"; // Ви можете вказати шлях до файлу через конструктор або безпосередньо в методі
  }

  /**
   * Читає дані з CSV файлу і повертає їх як обіцянку.
   *
   * @returns {Promise<any[]>} Promise, що резолвиться з масивом об'єктів зчитаних з CSV.
   */
  private async readApartmentData(): Promise<any[]> {
    const results = [];
    const maxRecords = 7500;
    let counter = 0;

    return new Promise((resolve, reject) => {
      const fileStream = fs.createReadStream(this.filePath);
      fileStream
        .pipe(csv({ separator: ";" })) // Встановлюємо роздільник даних на ";"
        .on("data", (data) => {
          if (counter < maxRecords) {
            results.push(data);
            console.log(data);
            counter++;
          }
        })
        .on("end", () => {
          console.log("Completed reading data. Total records read:", results.length);
          resolve(results); // Повертаємо результати після завершення читання файлу
        })
        .on("error", (err) => {
          console.error("Error while reading the file:", err);
          reject(err); // Відхиляємо обіцянку при виникненні помилки
        });
    });
  }

  /**
   * Публічний метод для сторонніх викликів.
   */
  public async processApartmentData() {
    try {
      const data = this.readApartmentData();
      const data2 = await data;
      console.log("Data processed successfully:", data2);
      return data2;
    } catch (error) {
      console.error("Failed to process data:", error);
    }
  }
}