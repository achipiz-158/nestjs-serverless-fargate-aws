import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Profile } from 'src/profile/entities/profile.entity';
import { LoginInput } from '../dto/login.input';
import { RegisterInput } from '../dto/register.input';
import { TokenResponse } from '../dto/token.response';
import { VerifyCode } from '../dto/verifyCode.response';
import { LocalGqlAuthGuard } from '../guards/gql-auth.guard';
import { JwtGQLAuthGuard } from '../guards/jwt-auth.guard';
import { AuthService } from '../services/auth.service';
import { GraphQLError } from 'graphql';

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => TokenResponse)
  @UseGuards(LocalGqlAuthGuard)
  login(@Args('loginInput') loginInput: LoginInput, @Context() context) {
    try {
      return this.authService.login(context.req.user as Profile);
    } catch (error) {
      throw new GraphQLError(error.message);
    }
  }

  @Mutation(() => TokenResponse)
  async register(@Args('registerUserInput') registerUserInput: RegisterInput) {
    try {
      return await this.authService.register(registerUserInput);
    } catch (error) {
      throw new GraphQLError(error.message);
    }
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtGQLAuthGuard)
  async regenerateCode(@Context() context) {
    return await this.authService.regenerateCode(context.req.user.sub);
  }

  @Query(() => VerifyCode)
  @UseGuards(JwtGQLAuthGuard)
  async verifyEmail(@Args('code') code: number, @Context() context) {
    return await this.authService.verifyEmail(code, context.req.user.sub);
  }

  @Mutation(() => Boolean)
  async sendCodeChangePassword(@Args('email') email: string) {
    return await this.authService.sendCodeChangePassword(email);
  }

  @Mutation(() => String)
  async verifyCodeChangePassword(@Args('code') code: number): Promise<string> {
    return await this.authService.verifyCodeChangePassword(code);
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtGQLAuthGuard)
  async resetPassword(
    @Args('password') password: string,
    @Context() context,
  ): Promise<boolean> {
    return await this.authService.resetPassword(password, context.req.user.sub);
  }
}
