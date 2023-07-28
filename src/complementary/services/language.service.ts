import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// import { CreateComplementaryInput } from '../dto/create-complementary.input';
// import { UpdateComplementaryInput } from '../dto/update-complementary.input';
import { In, Repository } from 'typeorm';
import { Language } from '../entities/language.entity';

@Injectable()
export class LanguageService {
  constructor(
    @InjectRepository(Language)
    private readonly languageRepository: Repository<Language>,
  ) {}
  findLanguages() {
    return this.languageRepository.find();
  }

  findManyByIds(ids: string[]) {
    return this.languageRepository.findBy({
      id: In(ids),
    });
  }

  findOneById(id: string) {
    return this.languageRepository.findOne({
      where: { id },
    });
  }

  myLanguages(userId: string) {
    return this.languageRepository.find({
      where: { hosts: { id: userId } },
    });
  }

  create(sub: string, name: string) {
    const language = this.languageRepository.create({ sub, name });
    return this.languageRepository.save(language);
  }
}
