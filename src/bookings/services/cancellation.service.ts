import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { FindManyOptions, Repository } from 'typeorm';

import { Cancellation } from '../entities';
import { WalletService } from '../../profile/services';
import { BookingService } from './booking.service';
import { TransactionService } from 'src/profile/services/transaction.service';
import { TypeTrasaction } from 'src/shared/enum/type.trasaction.enum';
import { StateCancellation } from 'src/shared';
import { ProcedureService } from 'src/complementary/services';
import { CancellationInput, CreateCancellationHostInput, CreateCancellationInput, FiltersCancellationInput } from '../dto';


@Injectable()
export class CancellationService {

  private readonly cancellationRelations = [
    'booking',
    'booking.user',
    'booking.hour',
    'booking.hour.schedule',
    'booking.hour.schedule.tripp'
  ];
  constructor(
    @InjectRepository(Cancellation)
    private readonly cancellationRepository: Repository<Cancellation>,
    private readonly bookingService: BookingService,
    private readonly walletService: WalletService,
    private readonly transactionService: TransactionService,
    private readonly procedureService: ProcedureService,

  ) { }

  async generateCancellation(cancellation: CreateCancellationInput, userId: string) {
    const { bookingId, ...res } = cancellation;
    const booking = await this.bookingService.getBookingById(bookingId);
    const { date, hour, user, payment } = booking;
    const today: any = new Date()
    const reservationDate: any = new Date(date)
    const dayPayment: any = new Date(payment?.epayco?.fecha)
    const diffInMillisecondsPayment = today - dayPayment
    const diffInMilliseconds = reservationDate - today
    const diffInHours = Math.floor(diffInMillisecondsPayment / (1000 * 60 * 60));
    const diffToDateExperience = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));

    if (diffInHours <= 48 && diffToDateExperience >= 7) {
      const wallet = await this.walletService.findByUser(user.id);
      await this.transactionService.create({ type: TypeTrasaction.DEBIT, value: payment.epayco.valor, description: "Devolución por cancelación  usuario, dentro de las políticas", wallet: wallet });
      await this.walletService.updateBalance({ user: user.id, balance: payment.epayco.valor, operation: TypeTrasaction.DEBIT });
      const walletHost = await this.walletService.findByUser(hour.schedule.tripp.host.id);
      await this.transactionService.create({ type: TypeTrasaction.CREDIT, value: payment.epayco.valor, description: "Devolución por cancelación  usuario, dentro de las políticas", wallet: walletHost });
      await this.walletService.updateBalance({ user: hour.schedule.tripp.host.id, balance: payment.epayco.valor, operation: TypeTrasaction.CREDIT });
      return this.createCancellation({ ...res, state: StateCancellation.CR, booking: booking });
    } else {
      return this.createCancellation({ ...res, state: StateCancellation.CET, booking: booking });
    }
  }

  async createCancellation(cancellation: CancellationInput) {
    const cancellationGenerate = this.cancellationRepository.create(cancellation)
    return await this.cancellationRepository.save(cancellationGenerate);
  }


  async createCancellationHost(cancellation: CreateCancellationHostInput, user) {
    const states = ['reserved', 'confirmed', 'prebooked'];
    const { trippId, reason } = cancellation
    const date = new Date();
    const bookings = await this.bookingService.getBookingsByTripp({ trippId, date, states });
    return bookings[bookings.length - 1];
  }



  async submitCancellationToCaseStudy(cancellationId: string, user: any) {
    const cancellation = await this.findByIdCancellation(cancellationId);
    if (cancellation.state === StateCancellation.CET) {
      const cancellationUpdated = await this.updateCancellation(cancellationId, StateCancellation.REVIEW);
      console.log(cancellationUpdated);
      this.procedureService.create({
        type: 'submit_cancellation_to_case_study',
        description: 'Cancelación por parte del usuario trippter con solicitud de estudio de caso',
        affair: 'Cancelación para estudio de caso',
        tripp: cancellationUpdated.booking.hour.schedule.tripp,
        applicant: cancellationUpdated.booking.user,
        cancellationId: cancellationUpdated
      });
      return cancellationUpdated
    } else {
      cancellation
    }
  }

  async updateCancellation(cancellationId: string, newStatus: string,) {
    const cancellation = await this.findByIdCancellation(cancellationId);
    cancellation.state = newStatus;
    return await this.cancellationRepository.save(cancellation);
  }

  async findByIdCancellation(cancellationId: string,) {
    const cancellation = await this.cancellationRepository.findOne({
      where: { id: cancellationId },
      relations: this.cancellationRelations
    });
    if (!cancellation) {
      throw new Error(`Cancellation with ID ${cancellationId} not found`);
    }
    return cancellation;

  }


  async findCancellations(filters: FiltersCancellationInput) {
    const queryBuilder = this.cancellationRepository.createQueryBuilder('cancellation');
    queryBuilder.leftJoinAndSelect('cancellation.booking', 'booking')
      .leftJoinAndSelect('booking.user', 'user')
      .leftJoinAndSelect('booking.hour', 'hour')
      .leftJoinAndSelect('booking.payment', 'payment')
      .leftJoinAndSelect('payment.epayco', 'epayco')
      .leftJoinAndSelect('hour.schedule', 'schedule')
      .leftJoinAndSelect('schedule.tripp', 'tripp');

    if (filters.date) {
      queryBuilder.andWhere('booking.date = :date', { date: filters.date });
    }

    if (filters.state) {
      queryBuilder.andWhere('cancellation.state = :state', { state: StateCancellation[filters.state] });
    }

    if (filters.host) {
      queryBuilder.andWhere('tripp.host.id = :hostId', { hostId: filters.host });
    }

    if (filters.tripp) {
      queryBuilder.andWhere('tripp.id = :trippId', { trippId: filters.tripp });
    }
    if (filters.booking) {
      queryBuilder.andWhere('booking.id = :bookingId', { bookingId: filters.booking });
    }

    const cancellations = await queryBuilder.getMany();

    if (!cancellations || cancellations.length === 0) {
      throw new Error(`Cancellations not found`);
    }

    return cancellations;
  }
}
