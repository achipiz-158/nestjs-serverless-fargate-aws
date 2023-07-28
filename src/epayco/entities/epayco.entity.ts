import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Payment } from './payment.entity';
import { Exclude } from 'class-transformer';
import { Field, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType() 
export class Epayco {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  ref_payco: string;

  @Column()
  @Field(() => String)
  factura: string;

  @Column()
  @Field(() => String)
  descripcion: string;

  @Column()
  @Field(() => Number)
  valor: number;

  @Column()
  @Field(() => Number)
  iva: number;

  @Column()
  @Field(() => Number)
  ico: number;

  @Column()
  @Field(() => Number)
  baseiva: number;

  @Column()
  @Field(() => Number)
  valorneto: number;

  @Column()
  @Field(() => String)
  moneda: string;

  @Column()
  @Field(() => String)
  banco: string;

  @Column()
  @Field(() => String)
  estado: string;

  @Column()
  @Field(() => String)
  respuesta: string;

  @Column()
  @Field(() => String)
  autorizacion: string;

  @Column()
  @Field(() => String)
  recibo: string;

  @Column()
  @Field(() => String)
  fecha: string;

  @Column()
  @Field(() => String)
  franquicia: string;

  @Column()
  cod_respuesta: number;

  @Column()
  cod_error: string;

  @Column()
  ip: string;

  @Column()
  enpruebas: number;

  @Column()
  @Field(() => String)
  tipo_doc: string;

  @Column()
  @Field(() => String)
  documento: string;

  @Column()
  @Field(() => String)
  nombres: string;

  @Column()
  @Field(() => String)
  apellidos: string;

  @Column()
  @Field(() => String)
  email: string;

  @Column()
  @Field(() => String)
  ciudad: string;

  @Column()
  direccion: string;

  @Column()
  @Field(() => String)
  ind_pais: string;

  @Column()
  country_card: string;

  @OneToOne(() => Payment, (payment) => payment.epayco)
  payment: Payment;

  @Exclude()
  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn({
    type: 'timestamp',
    name: 'updated_at',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;

  @Exclude()
  @DeleteDateColumn({
    type: 'timestamp',
    name: 'deleted_at',
  })
  deletedAt: Date;
}
