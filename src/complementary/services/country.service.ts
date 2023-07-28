import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Country } from '../entities/country.entity';
import { GraphQLError } from 'graphql';

@Injectable()
export class CountryService {
  constructor(
    @InjectRepository(Country)
    private countryRepository: Repository<Country>,
  ) {}

  async findOneById(id: string) {
    const country = await this.countryRepository.findOne({
      where: { id },
    });
    if (!country) {
      throw new GraphQLError('Country not found');
    }
    return country;
  }

  async create(name: string) {
    const country = this.countryRepository.create({ name });
    return await this.countryRepository.save(country);
  }

  async findAll() {
    return await this.countryRepository.find();
  }
}
