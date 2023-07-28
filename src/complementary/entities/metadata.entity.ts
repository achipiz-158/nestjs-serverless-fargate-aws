import { ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Metadata {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'version_host',
  })
  versionHost: string;

  @Column({
    name: 'version_trippster',
  })
  versionTrippster: string;

  @Column({
    name: 'token_epayco',
  })
  tokenEpayco: string;

  @Column({
    name: 'distance_nearby',
    default: 20000,
  })
  distanceNearby: number;
}
