import { InputType } from '@nestjs/graphql';
import { CreateProfileTrippsterInput } from './create-profile-trippster.input';

@InputType()
export class UpdateProfileInput extends CreateProfileTrippsterInput {}
