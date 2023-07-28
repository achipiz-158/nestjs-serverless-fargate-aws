import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Blocked } from '../entities';
import { Repository } from 'typeorm';
import { ProfileService } from './profile.service';
import { GraphQLError } from 'graphql';
import { FollowService } from './follow.service';

@Injectable()
export class BlockService {
  constructor(
    @InjectRepository(Blocked)
    private readonly blockedRepository: Repository<Blocked>,
    private readonly followService: FollowService,
    private readonly profileService: ProfileService,
  ) {}

  async block(blockedId: string, blockerId: string): Promise<boolean> {
    const block = await this.blockedRepository.create();
    const blocker = await this.profileService.findOneById(blockerId);
    block.blocker = blocker;
    const blocked = await this.profileService.findOneById(blockedId);
    block.blocked = blocked;
    await this.blockedRepository.save(block);
    await this.followService.unfollowUser(blockerId, blockedId);
    return true;
  }

  async unblock(blockedId: string, blockerId: string): Promise<boolean> {
    const block = await this.blockedRepository.findOne({
      where: {
        blocker: { id: blockerId },
        blocked: { id: blockedId },
      },
      relations: {
        blocker: true,
        blocked: true,
      },
    });
    if (!block) {
      throw new GraphQLError('Block not found');
    }
    await this.blockedRepository.remove(block);
    return true;
  }
}
