import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';
import { PayloadToken } from '../model/payload-token.model';
import { ProfileService } from 'src/profile/services';

@Injectable()
export class IsBlockGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly profileService: ProfileService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const args = ctx.getArgs();
    const user = ctx.getContext().req.user as PayloadToken;
    const isBlock = await this.profileService.isBlock(user.sub, args.userId);
    if (isBlock) {
      throw new GraphQLError('User not found');
    }
    return true;
  }
}
