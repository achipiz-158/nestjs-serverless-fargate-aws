import { Module, forwardRef } from '@nestjs/common';
import { ProfileModule } from 'src/profile/profile.module';
import { AuthService } from './services/auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthResolver } from './resolvers/auth.resolver';
import { JwtModule } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import config from 'src/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { MailModule } from 'src/mail/mail.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Code } from './entities/code.entity';
import { AdminStrategy } from './strategies/admin.strategy';

@Module({
  imports: [
    forwardRef(() => ProfileModule),
    TypeOrmModule.forFeature([Code]),
    MailModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigType<typeof config>) => ({
        secret: configService.jwt.secret,
      }),
      inject: [config.KEY],
    }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    AuthResolver,
    JwtStrategy,
    AdminStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule {}
