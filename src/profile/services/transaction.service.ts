import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile, Transaction } from '../entities';
import { WalletService } from './wallet.service';
import { CreateTransactionInput } from '../dto';


@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private readonly tansactionRepository: Repository<Transaction>,
 
  ) { }

  async create(transaction: CreateTransactionInput): Promise<Transaction> {
    try {
      const newTransaction = this.tansactionRepository.create(transaction);
      return await this.tansactionRepository.save(newTransaction);
    } catch (error) {
      console.log(error);
    }
  }

  
}
