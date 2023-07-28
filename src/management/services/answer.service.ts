import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Answer } from '../entities/answer.entity';
import { CreateAnswerInput } from '../dto';

@Injectable()
export class AnswerService {
  private readonly logger = new Logger('UsersManagementService');

  constructor(
    @InjectRepository(Answer)
    private answerRepository: Repository<Answer>,
  ) {}

  async create(createAnswerInput: CreateAnswerInput) {
    try {
      const newAnswer = this.answerRepository.create(createAnswerInput);
      return await this.answerRepository.save(newAnswer);
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  // findAll() {
  //   return `This action returns all management`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} management`;
  // }

  // update(id: number, updateManagementInput: UpdateManagementInput) {
  //   return `This action updates a #${id} management`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} management`;
  // }

  private handleDBExceptions(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    this.logger.error(error);

    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }
}
