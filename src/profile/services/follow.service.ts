import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Follow } from '../entities';
import { ProfileService } from './profile.service';

@Injectable()
export class FollowService {
  constructor(
    @InjectRepository(Follow)
    private readonly followRepository: Repository<Follow>,
    private readonly profileService: ProfileService,
  ) {}

  async followUser(followerId: string, followedId: string) {
    const follow = await this.followRepository.findOne({
      where: {
        follower: {
          id: followerId,
        },
        followed: {
          id: followedId,
        },
      },
    });
    if (follow) {
      await this.followRepository.remove(follow);
      return true;
    }
    const follower = await this.profileService.findOneById(followerId);
    const followed = await this.profileService.findOneById(followedId);
    await this.followRepository.save({ follower, followed });
    return true;
  }

  async isFollow(id: string, idToFollow: string) {
    const profile = await this.followRepository.findOne({
      where: {
        follower: {
          id: In([id, idToFollow]),
        },
        followed: {
          id: In([id, idToFollow]),
        },
      },
    });
    return profile ? true : false;
  }

  async unfollowUser(followerId: string, followedId: string) {
    const follow = await this.followRepository.findOne({
      where: {
        follower: {
          id: In([followerId, followerId]),
        },
        followed: {
          id: In([followedId, followedId]),
        },
      },
    });
    if (follow) {
      await this.followRepository.remove(follow);
      return true;
    }
    return true;
  }
}
