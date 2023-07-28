import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking, Cancellation } from './entities';
import { Procedure } from 'src/complementary/entities';
import { BookingResolver, CancellationResolver } from './resolvers';
import { Transaction, Wallet } from 'src/profile/entities';
import { BookingService, CancellationService } from './services';
import { TransactionService, WalletService } from 'src/profile/services';
import { ProcedureService } from 'src/complementary/services';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Booking,
      Cancellation,
      Wallet,
      Transaction,
      Procedure,
    ]),
  ],
  providers: [
    BookingResolver,
    BookingService,
    CancellationService,
    WalletService,
    TransactionService,
    ProcedureService,
    CancellationResolver,
  ],
  exports: [BookingService],
})
export class BookingsModule {}
