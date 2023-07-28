import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, ILike, Not, Repository } from 'typeorm';
import { Point } from 'geojson';
import { Tripp } from 'src/experience/entities';
import {
  CityService,
  LanguageService,
  ProcedureService,
} from 'src/complementary/services';
import { ProfileService } from 'src/profile/services/profile.service';
import {
  CreateTrippInput,
  FiltersTrippInput,
  UbicationTrippInput,
  UpdatePublishedInput,
  ReportTrippInput,
} from 'src/experience/dto';
import { CategoryService } from 'src/complementary/services/category.service';
import { AnswerService } from '../../management/services/answer.service';
import { Consultation } from 'src/shared/interface/consultation';
import { ParamNearbyTrippInput } from '../dto/tripp/get-nearby-tripps.entity';
import { MetadataService } from 'src/complementary/services/metadata.service';
import { RatingService } from 'src/complementary/services/rating.service';
import { RatingTrippInput } from '../dto/tripp/rating-tripp.input';
import { BookingService } from 'src/bookings/services';
import { StateBooking } from '../../shared/enum/state/booking.enum';
import { GraphQLError } from 'graphql';

@Injectable()
export class TrippsService {
  private readonly trippRelations = [
    'city',
    'city.country',
    'category',
    'gallery',
    'host',
    'host.host',
    'rating',
    'language',
    'schedule',
    'schedule.hours',
  ];

  constructor(
    @InjectRepository(Tripp)
    private readonly trippRepository: Repository<Tripp>,
    private readonly answerService: AnswerService,
    private readonly bookingService: BookingService,
    private readonly profileService: ProfileService,
    private readonly languagesService: LanguageService,
    private readonly cityService: CityService,
    private readonly categoryService: CategoryService,
    private readonly procedureService: ProcedureService,
    private readonly metadataService: MetadataService,
    private readonly ratingService: RatingService,
  ) {}

  async find(filters: any) {
    return await this.trippRepository.find({
      relations: this.trippRelations,
      where: filters,
    });
  }

  async findOne(filters: Consultation) {
    return await this.trippRepository.findOne(filters);
  }

  async searcherTripps(filters: FiltersTrippInput) {
    const where: FindOptionsWhere<Tripp> = {
      published: true,
      name: ILike(`%${filters.searchParameter}%`),
      host: {
        name: ILike(`%${filters.searchParameter}%`),
        lastname: ILike(`%${filters.searchParameter}%`),
      },
    };
    const tripps = await this.trippRepository.find({
      relations: {
        gallery: true,
        city: {
          country: true,
        },
        schedule: true,
        host: {
          gallery: true,
        },
      },
      where: filters.cityId
        ? {
            city: {
              id: filters.cityId,
            },
          }
        : where,
    });
    return tripps;
  }

  async findSuggestionsTripps(UserId: string) {
    return await this.trippRepository.find({
      relations: {
        gallery: true,
        city: true,
        host: {
          gallery: true,
        },
      },
      where: { published: true, host: { id: Not(UserId) } },
      take: 3,
    });
  }

  async findTrippsByHost(hostId: string) {
    return await this.trippRepository.find({
      relations: {
        gallery: true,
        city: true,
        host: {
          gallery: true,
        },
      },
      where: { published: true, host: { id: hostId } },
      take: 3,
    });
  }

  async findAll() {
    return await this.find({ relations: ['city', 'category', 'host'] });
  }

  async findOneById(id: string) {
    // if (Array.isArray(userRol)) {
    const relations = this.trippRelations.concat([
      'procedures',
      'procedures.answers',
      'procedures.answers.manager',
    ]);
    return await this.findOne({ where: { id }, relations });
    // } else {
    //   return await this.findOne({
    //     where: { id },
    //     relations: this.trippRelations,
    //   });
    // }
  }

  async myTripps(profileId: string) {
    return await this.trippRepository.find({
      where: { host: { id: profileId } },
      relations: ['city', 'city.country', 'language', 'category', 'gallery'],
    });
  }

  async createTrippOrUpdate(trippData: CreateTrippInput, profileId: string) {
    if (trippData.trippId) {
      return await this.updateTripp(trippData);
    }
    return await this.createTripp(trippData, profileId);
  }

  async createTripp(trippData: CreateTrippInput, profileId: string) {
    const newTripp = this.trippRepository.create(trippData);
    const language = await this.languagesService.findOneById(
      trippData.languageId,
    );
    const category = await this.categoryService.findOneById(
      trippData.categoryId,
    );
    const host = await this.profileService.findOneById(profileId);

    newTripp.language = language;
    newTripp.category = category;
    newTripp.host = host;
    const trippSave = await this.trippRepository.save(newTripp);
    this.procedureService.create({
      type: 'post_confirmation',
      affair: 'Confirmación de publicación tripp',
      tripp: trippSave,
      applicant: host,
    });
    return trippSave;
  }

  async updateTripp(trippData: CreateTrippInput) {
    const trippToUpdate = await this.findOne({
      where: { id: trippData.trippId },
    });
    if (!trippToUpdate) {
      return this.errorHandler('Tripp not found');
    }
    const language = await this.languagesService.findOneById(
      trippData.languageId,
    );
    const category = await this.categoryService.findOneById(
      trippData.categoryId,
    );

    this.trippRepository.merge(trippToUpdate, {
      ...trippData,
      language,
      category,
    });
    return await this.trippRepository.save(trippToUpdate);
  }

  async updateStateTripp(id: string, data: UpdatePublishedInput) {
    const { procedureId, ...res } = data;
    const procedure = await this.procedureService.findOneById(procedureId);
    const user = await this.profileService.findOneById(id);
    this.answerService.create({ procedure, manager: user, ...res });

    if (
      (data.type === 'CPT' || data.type === 'NPT') &&
      procedure.state === 'pending'
    ) {
      const tripp = await this.findOneById(procedure.tripp.id);
      const state = data.type === 'CPT' ? true : false;
      const trippToUpdate = this.trippRepository.merge(tripp, {
        published: state,
      });

      if (trippToUpdate) {
        await this.procedureService.updateState(procedure.id, 'resolved');
        return await this.trippRepository.save(trippToUpdate);
      }
    }
  }

  async ubicationTripp(tripp: UbicationTrippInput) {
    const trippToUpdate = await this.trippRepository.findOne({
      where: { id: tripp.trippId },
    });
    if (!trippToUpdate) {
      return this.errorHandler('Tripp not found');
    }
    const city = await this.cityService.findOneById(tripp.cityId);
    const meetingPoint: Point = {
      type: 'Point',
      coordinates: [tripp.longitud, tripp.latitud],
    };
    this.trippRepository.merge(trippToUpdate, { ...tripp, city, meetingPoint });
    return await this.trippRepository.save(trippToUpdate);
  }

  async reportTripp(applicantId: string, report: ReportTrippInput) {
    const { trippId, affair, description } = report;
    const tripp = await this.findOneById(trippId);
    if (!tripp) {
      return this.errorHandler('Tripp not found');
    } else {
      const applicant = await this.profileService.findOneById(applicantId);
      if (!applicant) {
        return this.errorHandler('user not found');
      }
      this.procedureService.create({
        type: 'report_tripp',
        affair,
        description,
        tripp,
        applicant,
      });
      return this.findOneById(trippId);
    }
  }

  errorHandler(message: string) {
    throw new HttpException(`${message}`, HttpStatus.BAD_REQUEST);
  }

  async addRatingTripp(rating: RatingTrippInput, userId: string) {
    const trippExistBooking = await this.bookingService.existBookingTripp(
      rating.trippId,
      userId,
    );
    if (!trippExistBooking) {
      throw new GraphQLError('You must have a reservation to rate');
    }
    const tripp = await this.findOneById(rating.trippId);
    if (!tripp) {
      return this.errorHandler('Tripp not found');
    }
    const user = await this.profileService.findOneById(userId);
    const ratingExist = await this.trippRepository.findOne({
      relations: { rating: { profile: true } },
      where: { id: rating.trippId, rating: { profile: { id: userId } } },
    });
    if (ratingExist) {
      return this.errorHandler('You have already rated this tripp');
    }
    const { stars, comment } = rating;
    const newRating = await this.ratingService.createRating(
      comment,
      stars,
      user,
    );
    tripp.rating.push(newRating);
    await this.trippRepository.save(tripp);
    return true;
  }

  async getTrippsNearby({ latitud, longitud }: ParamNearbyTrippInput) {
    const metadata = await this.metadataService.getMetadata();
    const result = await this.trippRepository.query(`
      select city,
      (array_agg(c."name"))[1] as name,
      array_agg(g2.url) as images
      from tripp t
      inner join city c on t.city = c.id
      inner join (
            select *
            from gallery g
            where g.type = 'DEFAULT'::gallery_type_enum
          ) g2 on g2.tripp = t.id
      where ST_DWithin(
            t.meeting_point 
            , 
            ST_GeomFromText(
              'POINT(${latitud} ${longitud})'
              , 4326
            )::geography
            , ${metadata.distanceNearby}
            , true
          ) and t.published = true
      group by city
      limit 6;
    `);
    return result;
  }

  async pauseExperience(id: string) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    console.log(today);
    const bookings = await this.bookingService.getBookingsByTripp({
      trippId: id,
      states: [
        StateBooking.PREBOOKED,
        StateBooking.RESERVED,
        StateBooking.CONFIRMED,
      ],
      order: true,
      today: today,
    });
    console.log(bookings);
    if (bookings.length > 0) {
      return `${bookings[0].date}/ ${bookings[0].hour.hour}`;
    }
  }

  async findSuggestionsTrippsByProfile(UserId: string) {
    return await this.trippRepository.find({
      relations: {
        gallery: true,
        city: true,
        host: true,
        schedule: {
          hours: {
            bookings: {
              user: true,
            },
          },
        },
      },
      where: {
        published: true,
        schedule: { hours: { bookings: { user: { id: UserId } } } },
      },
      take: 3,
    });
  }
}
