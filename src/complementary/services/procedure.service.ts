import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProcedureInput } from '../dto';
import { Procedure } from '../entities/procedure.entity';

@Injectable()
export class ProcedureService {
  constructor(
    @InjectRepository(Procedure)
    private readonly procedureRepository: Repository<Procedure>,
  ) {}

  async findAll() {
    return await this.procedureRepository.find();
  }

  async create(createProcedureInput: CreateProcedureInput) {
    const procedure = this.procedureRepository.create(createProcedureInput);
    return this.procedureRepository.save(procedure);
  }

  async findOneById(id: string) {
    const procedure = await this.procedureRepository.findOne({
      where: { id },
      relations: ['applicant', 'answers', 'tripp'],
    });
    if (!procedure) {
      throw new HttpException('Procedure not found', HttpStatus.NOT_FOUND);
    }
    return procedure;
  }

  async updateState(id: string, state: string) {
    const update = await this.procedureRepository
      .createQueryBuilder()
      .update(Procedure)
      .set({ state })
      .where('id= :id', {
        id,
      })
      .execute();
    if (update.affected === 1) {
      const userUpdate = await this.findOneById(id);
      return userUpdate;
    }
  }
}
