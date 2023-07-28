import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { firstValueFrom } from 'rxjs';
import { BookingService } from 'src/bookings/services/booking.service';
import { ScheduleService } from 'src/experience/services';
import { ProfileService } from 'src/profile/services/profile.service';
import { EpaycoStatus } from 'src/shared/enum/epaycoStatus.enum';
import { Repository } from 'typeorm';
import { CreatePayInput } from '../dto/pay.input';
import { Billing } from '../entities/billing.entity';
import { Epayco } from '../entities/epayco.entity';
import { Payment } from '../entities/payment.entity';
import { MetadataService } from 'src/complementary/services/metadata.service';

@Injectable()
export class PaymentsService {
  constructor(
    private readonly httpService: HttpService,
    private readonly scheduleService: ScheduleService,
    @InjectRepository(Billing)
    private readonly billingRepository: Repository<Billing>,
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    @InjectRepository(Epayco)
    private readonly epaycoRepository: Repository<Epayco>,
    private readonly profileService: ProfileService,
    private readonly bookingService: BookingService,
    private readonly metadataService: MetadataService,
  ) { }

  async createPayment(createPayment: CreatePayInput, userId: string) {
    try {
      const hourTripp = await this.scheduleService.getHour(
        createPayment.hourId,
      );
      const metadata = await this.metadataService.getMetadata();
      const profile = await this.profileService.findOneById(userId);
      const result = await firstValueFrom(
        this.httpService.post(
          '/payment/process',
          {
            ...createPayment,
            value: (
              hourTripp.schedule.tripp.price * createPayment.count
            ).toString(),
            phone: '000000',
            cardExpYear: createPayment.cardExpYear.toString(),
            cardExpMonth: createPayment.cardExpMonth.toString(),
            dues: createPayment.dues.toString(),
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${metadata.tokenEpayco}`,
            },
          },
        ),
      );
      const statusTransaction = result.data.data.transaction.data
        .cc_network_response.message
        ? result.data.data.transaction.data.cc_network_response.message
        : result.data.data.transaction.data.estado;
      if (statusTransaction === EpaycoStatus.REJECTED) {
        return 'rechazada';
      }
      const billing = this.billingRepository.create({
        ...createPayment,
        phone: createPayment.cellPhone,
        cardTokenId: result.data.data.tokenCard.cardTokenId,
        profile,
      });
      await this.billingRepository.save(billing);
      const epayco = this.epaycoRepository.create({
        ...result.data.data.transaction.data,
      });
      await this.epaycoRepository.save(epayco);
      const booking = await this.bookingService.createBooking(
        {
          attendees: createPayment.count,
          date: createPayment.date,
        },
        hourTripp,
        profile,
      );
      const payment = this.paymentRepository.create({
        ...result.data.data.transaction.data,
        state: statusTransaction,
        billing,
        epayco,
        booking,
      });
      await this.paymentRepository.save(payment);
      return statusTransaction;
    } catch (error) {
      return 'error';
    }
  }

  async getPayment(id: string) {
    return await this.paymentRepository.findOne({
      where: { id },
      relations: [
        'epayco', 
        'bookings', 
        'bookings.hour',
        'bookings.hour.schedule',
        'bookings.hour.schedule.tripp',
        'bookings.hour.schedule.tripp.city',
        'bookings.hour.schedule.tripp.city.country',
        'bookings.hour.schedule.tripp.language',
        'bookings.hour.schedule.tripp.gallery',
      ]
    })
  }

  async getPayments() {
    return await this.paymentRepository.find()
  }
}
