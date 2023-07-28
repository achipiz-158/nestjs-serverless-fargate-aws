import { Field, ObjectType } from '@nestjs/graphql';
import { Role } from 'src/profile/entities';

@ObjectType()
export class TokenResponse {
  @Field(() => String)
  id: string;

  @Field(() => String, { nullable: true })
  profileImage?: string;

  @Field(() => String)
  accessToken: string;

  @Field(() => Boolean)
  emailVerified: boolean;

  @Field(() => Boolean)
  registered: boolean;

  @Field(() => [Role])
  roles: Role[];
}
