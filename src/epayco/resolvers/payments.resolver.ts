import {  UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver, Query, } from '@nestjs/graphql';
import { JwtGQLAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreatePayInput } from '../dto/pay.input';
import { PaymentsService } from '../services/payments.service';
import { Payment } from '../entities/payment.entity';

@Resolver()
@UseGuards(JwtGQLAuthGuard)
export class PaymentsResolver {
  constructor(private readonly paymentsService: PaymentsService) {}
  
  @Mutation(() => String)
  async createPayment(
    @Args('createPaymentInput', { type: () => CreatePayInput })
    createPayInput: CreatePayInput,
    @Context() context,
  ) {
    return this.paymentsService.createPayment(
      createPayInput,
      context.req.user.sub,
    );
  }

  @Query(() => [Payment])
  payments(@Context() context) {
    return this.paymentsService.getPayments();
  }

  @Query(() => Payment)
  payment(@Args('id') id: string, @Context() ctx) {
    return this.paymentsService.getPayment(id);
  }

}
