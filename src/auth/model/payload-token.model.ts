import { Role } from 'src/profile/entities';

export interface PayloadToken {
  sub: string;
  roles: Role[];
  email: string;
}
