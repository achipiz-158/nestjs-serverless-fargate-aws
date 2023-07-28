import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Metadata } from '../entities/metadata.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MetadataService {
  constructor(
    @InjectRepository(Metadata)
    private readonly metadataRepository: Repository<Metadata>,
  ) {}

  async updateTokenEpayco(token: string) {
    const metadata = (await this.metadataRepository.find())[0];
    await this.metadataRepository.merge(metadata, { tokenEpayco: token });
    return await this.metadataRepository.save(metadata);
  }

  async getMetadata(): Promise<Metadata> {
    return (await this.metadataRepository.find())[0];
  }
}
