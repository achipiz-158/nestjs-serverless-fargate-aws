import { HttpModule, HttpService } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PaymentsService } from './services/payments.service';
import { PaymentsResolver } from './resolvers/payments.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import config from 'src/config';
import { ExperiencesModule } from 'src/experience/experiences.module';
import { Billing } from './entities/billing.entity';
import { ProfileModule } from 'src/profile/profile.module';
import { BookingsModule } from 'src/bookings/bookings.module';
import { Epayco } from './entities/epayco.entity';
import { EpaycoService } from './services/epayco.service';
import { ComplementaryModule } from 'src/complementary/complementary.module';
import { firstValueFrom } from 'rxjs';
import { MetadataService } from 'src/complementary/services/metadata.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Payment, Billing, Epayco]),
    HttpModule.registerAsync({
      useFactory: (configService: ConfigType<typeof config>) => ({
        baseURL: configService.epayco.baseURL,
      }),
      inject: [config.KEY],
    }),

    ExperiencesModule,
    ProfileModule,
    BookingsModule,
    ComplementaryModule,
  ],
  providers: [
    PaymentsService,
    PaymentsResolver,
    EpaycoService,
    {
      provide: 'TOKEN_EPAYCO',
      useFactory: async (
        configServive: ConfigType<typeof config>,
        http: HttpService,
        metadataService: MetadataService,
      ) => {
        const response = await firstValueFrom(
          http.post(
            '/login',
            {},
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Basic ${Buffer.from(
                  `${configServive.epayco.publicKey}:${configServive.epayco.privateKey}`,
                ).toString('base64')}`,
              },
            },
          ),
        );
        const metadata = await metadataService.updateTokenEpayco(
          response.data.token,
        );
        return metadata.tokenEpayco;
      },
      inject: [config.KEY, HttpService, MetadataService],
    },
  ],
})
export class EpaycoModule {}
