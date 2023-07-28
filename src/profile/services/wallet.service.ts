import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile, Wallet } from '../entities';
import { TypeTrasaction } from 'src/shared/enum/type.trasaction.enum';

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(Wallet)
    private readonly walletRepository: Repository<Wallet>,
  ) {}

  async create(profile: Profile): Promise<any> {
    try {
      const wallet = this.walletRepository.create({ profile });
      return await this.walletRepository.save(wallet);
    } catch (error) {
      console.log(error);
    }
  }

  async findByUser(user: string): Promise<any> {
    try {
      return this.walletRepository.findOne({ where: { profile: { id: user } } });
    } catch (error) {
      console.log(error);
    }
  }
  async findById(id: string): Promise<any> {
    try {
      return await this.walletRepository.findOne({ where: { id } });
    } catch (error) {
      console.log(error);
    }
  }

  async updateBalance(inputUpdateWallet: any): Promise<any> {
    const { user, balance, operation } = inputUpdateWallet;
    try {
      const wallet = await this.findByUser(user);

      if (operation === TypeTrasaction.DEBIT) {
        wallet.balance = wallet.balance + balance;
        return await this.walletRepository.save(wallet);
      }

      if (operation === TypeTrasaction.CREDIT) {
        wallet.balance = wallet.balance - balance;
        return await this.walletRepository.save(wallet);
      }
    } catch (error) {
      console.log(error);
    }
  }

}
