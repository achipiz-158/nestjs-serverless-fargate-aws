import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { City } from '../entities/city.entity';
import { CountryService } from './country.service';
import { GraphQLError } from 'graphql';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(City)
    private readonly cityRepository: Repository<City>,
    private readonly countryService: CountryService,
  ) {}

  async findOneById(id: string) {
    return await this.cityRepository.findOne({
      where: { id },
    });
  }

  async findCitiesByName(name: string) {
    try {
      return await this.cityRepository.find({
        where: {
          name: ILike(`%${name}%`),
        },
        relations: ['country'],
        take: 7,
      });
    } catch (error) {
      throw new GraphQLError('Error in find cities by name');
    }
  }

  async findCityByCountry(name: string) {
    return await this.cityRepository.find({
      where: {
        country: {
          name: name,
        },
      },
    });
  }

  async create(name: string, countryId: string) {
    const city = this.cityRepository.create({ name });
    const country = await this.countryService.findOneById(countryId);
    city.country = country;
    return await this.cityRepository.save(city);
  }
}
