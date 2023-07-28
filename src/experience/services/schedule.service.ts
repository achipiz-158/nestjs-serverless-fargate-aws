import { Injectable } from '@nestjs/common';
import { CreateScheduleInput } from 'src/experience/dto/schedule/create-schedule.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Schedule } from '../entities/schedule.entity';
import { Repository } from 'typeorm';
import { Week } from '../entities/week.entity';
import { TrippsService } from './tripps.service';

const days = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
];

const nameDaysQuotas = [
  'mondayQuotas',
  'tuesdayQuotas',
  'wednesdayQuotas',
  'thursdayQuotas',
  'fridayQuotas',
  'saturdayQuotas',
  'sundayQuotas',
];

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(Schedule)
    private readonly scheduleRepository: Repository<Schedule>,
    @InjectRepository(Week)
    private readonly weekRepository: Repository<Week>,
    private readonly trippsService: TrippsService,
  ) {}

  async createSchedule(createScheduleInput: CreateScheduleInput) {
    const schedule = this.scheduleRepository.create(createScheduleInput);
    schedule.tripp = await this.trippsService.findOneById(
      createScheduleInput.trippId,
    );
    const newSchedule = await this.scheduleRepository.save(schedule);
    for (let i = 0; i < 7; i++) {
      const day = days[i];
      if (createScheduleInput[day]) {
        await this.saveDays(
          newSchedule,
          i + 1,
          createScheduleInput[day],
          createScheduleInput[nameDaysQuotas[i]],
        );
      }
    }
    return newSchedule;
  }

  async getSchedule(id: string) {
    return await this.scheduleRepository.findOne({
      where: { id },
      relations: ['hours'],
    });
  }

  async getWeek(id: string) {
    return await this.weekRepository
      .createQueryBuilder('week')
      .select('array_agg(week.hour)', 'hours')
      .addSelect('array_agg(week.id)', 'ids')
      .addSelect('week.day', 'day')
      .addSelect('array_agg(week.quotas)', 'quotas')
      .where('week.schedule = :id', { id })
      .groupBy('week.day')
      .getRawMany();
  }

  async saveDays(
    schedule: Schedule,
    day: number,
    hours: string[],
    quota: number,
  ) {
    for (const hour of hours) {
      const week = this.weekRepository.create({
        day: day,
        hour: hour,
        schedule: schedule,
        quotas: quota,
      });
      await this.weekRepository.save(week);
    }
  }

  async getHour(id: string) {
    return await this.weekRepository.findOne({
      where: { id },
      relations: ['schedule', 'schedule.tripp'],
    });
  }
}
