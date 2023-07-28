import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Week } from 'src/experience/entities/week.entity';
import { Profile } from 'src/profile/entities/profile.entity';
import { In, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { BookingFilterDTO, CreateBookingInput } from '../dto';
import { Booking } from '../entities';

@Injectable()
export class BookingService {
  private readonly bookingRelations = [
    'hour',
    'hour.schedule',
    'hour.schedule.tripp',
    'hour.schedule.tripp.city',
    'hour.schedule.tripp.city.country',
    'hour.schedule.tripp.host',
    'hour.schedule.tripp.language',
    'hour.schedule.tripp.gallery',
  ];
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
  ) {}

  async createBooking(
    createBooking: CreateBookingInput,
    hour: Week,
    user: Profile,
  ) {
    return await this.bookingRepository.save({ ...createBooking, hour, user });
  }

  async getBookingsByUser(user: Profile) {
    return await this.bookingRepository.find({
      where: {
        user: {
          id: user.id,
        },
      },
      relations: this.bookingRelations,
    });
  }

  async getBookingById(id: string) {
    return await this.bookingRepository.findOne({
      where: {
        id,
      },
      relations: this.bookingRelations,
    });
  }

  async getBookingsByTripp(filters: BookingFilterDTO) {
    const { trippId, date, startTime, endTime, order, states, published } =
      filters;

    return await this.bookingRepository.find({
      where: {
        hour: {
          schedule: {
            tripp: {
              id: trippId,
              published: published && published,
            },
            startDate: startTime && startTime,
            endDate: endTime && endTime,
          },
        },
        state: states && In(states),
        date: date && MoreThanOrEqual(date),
      },
      order: order && {
        date: 'DESC',
      },
    });
  }

  async getNextTripps(userID: string) {
    const result = await this.bookingRepository.find({
      where: {
        user: {
          id: userID,
        },
        date: MoreThanOrEqual(new Date()),
      },
      relations: this.bookingRelations,
    });
    return result;
  }

  async getMyMemoriesTripps(userID: string) {
    const result = await this.bookingRepository.find({
      where: {
        user: {
          id: userID,
        },
        date: LessThanOrEqual(new Date()),
      },
      relations: {
        hour: {
          schedule: {
            tripp: {
              city: {
                country: true,
              },
              host: {
                host: true,
              },
              language: true,
              gallery: true,
            },
          },
        },
      },
      order: {
        date: 'DESC',
      },
    });
    return result;
  }

  async existBookingTripp(trippId: string, userID: string) {
    const result = await this.bookingRepository.find({
      where: {
        user: {
          id: userID,
        },
        hour: {
          schedule: {
            tripp: {
              id: trippId,
            },
          },
        },
        date: LessThanOrEqual(new Date()),
      },
      relations: {
        hour: {
          schedule: {
            tripp: true,
          },
        },
      },
    });
    return result.length > 0 ? true : false;
  }

  async existBookingHost(hostId: string, userID: string) {
    const result = await this.bookingRepository.find({
      where: {
        user: {
          id: userID,
        },
        hour: {
          schedule: {
            tripp: {
              host: {
                host: {
                  id: hostId,
                },
              },
            },
          },
        },
        date: LessThanOrEqual(new Date()),
      },
      relations: {
        hour: {
          schedule: {
            tripp: true,
          },
        },
      },
    });
    return result.length > 0 ? true : false;
  }

  async getBookingsByHost(id: string) {
    console.log(id);
    const result = await this.bookingRepository.query(`
    select 
    b.date,
    count(b.id) as reservas, 
    (array_agg(w."hour"))[1] as hour,
    (array_agg(t."name"))[1] as name,
    (array_agg(c."name"))[1] as city,
    (array_agg(c2."name"))[1] as country,
    (array_agg(t."price"))[1] as price,
    (array_agg(l."name"))[1] as "language",
    (array_agg(g2."url"))[1] as "url",
    jsonb_agg(
      json_build_object(
        'image', p.img,
        'host', p.verified_host
      ) 
    ) as users
    from booking b
    inner join week w ON w.id = b.week
    inner join schedule s on s.id = w.schedule
    inner join tripp t on t.id = s.tripp
    inner join city c on t.city = c.id
    inner join country c2 on c2.id = c.country_id 
    inner join profile p on b."user" = p.id
    inner join "language" l on l.id = t."language"
    inner join (
      select *
      from gallery g
      where g.type = 'FRONT'::gallery_type_enum
    ) g2 on g2.tripp = t.id
    where t.host = '${id}'::uuid
    group by b.date, w.id
    order by b.date ASC
    `);
    // .createQueryBuilder('booking')
    // .select('booking.date')
    // .addSelect('COUNT(booking.id)', 'count')
    // .addSelect('hour.id', 'hourId')
    // .addSelect('schedule.duration', 'duration')
    // // .addSelect('schedule.tripp.id', 'trippId')
    // // .addSelect('COUNT(booking.id)', 'count')
    // // .addSelect('array_agg(booking.hour.id)', 'hourId')
    // .innerJoin('booking.hour', 'hour')
    // .innerJoin('hour.schedule', 'schedule')
    // .innerJoin('schedule.tripp', 'tripp')
    // .leftJoin('hour.schedule', 'schedule')
    // .leftJoin('schedule.tripp', 'tripp')
    // // .where('tripp.host = :id', { id })
    // .groupBy('booking.date, hour.id')
    // .getRawMany();
    return result;
  }

  async getBooking(id: string): Promise<Booking> {
    return await this.bookingRepository.findOne({
      where: {
        id,
        date: LessThanOrEqual(new Date()),
      },
      relations: {
        hour: {
          schedule: {
            tripp: {
              host: {
                host: true,
              },
            },
          },
        },
      },
    });
  }
}
