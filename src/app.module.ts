import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { EpaycoModule } from './epayco/epayco.module';
import { ConfigModule } from '@nestjs/config';
import config from './config';
import * as Joi from 'joi';
import { ExperiencesModule } from './experience/experiences.module';
import { AuthModule } from './auth/auth.module';
import { DatabasePostgresModule } from './database/postgres.module';
import { ProfileModule } from './profile/profile.module';
import { BookingsModule } from './bookings/bookings.module';
import { ComplementaryModule } from './complementary/complementary.module';
import { AwsModule } from './aws/aws.module';
import { MailModule } from './mail/mail.module';
import { ManagementModule } from './management/management.module';
import { ScheduleModule } from '@nestjs/schedule';
import { MyWorldModule } from './my-world/my-world.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: true,
      driver: ApolloDriver,
      debug: process.env.NODE_ENV !== 'production',
      playground: process.env.NODE_ENV !== 'production',
      formatError: (error) => {
        return {
          message: error.message,
        };
      },
      autoTransformHttpErrors: true,
    }),

    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [config],
      validationSchema: Joi.object({
        DB_TYPE: Joi.string().required(),
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        EPAYCO_PUBLIC_KEY: Joi.string().required(),
        EPAYCO_PRIVATE_KEY: Joi.string().required(),
        EPAYCO_BASE_URL: Joi.string().required(),
        S3_REGION: Joi.string().required(),
        S3_ACCESS_KEY_ID: Joi.string().required(),
        S3_SECRET_ACCESS_KEY: Joi.string().required(),
        S3_BUCKET_NAME: Joi.string().required(),
        MAIL_HOST: Joi.string().required(),
        MAIL_USER: Joi.string().required(),
        MAIL_PASS: Joi.string().required(),
        MAIL_FROM: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
      }),
    }),
    ScheduleModule.forRoot(),
    AuthModule,
    BookingsModule,
    DatabasePostgresModule,
    EpaycoModule,
    ExperiencesModule,
    ProfileModule,
    ComplementaryModule,
    AwsModule,
    MailModule,
    ManagementModule,
    MyWorldModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
