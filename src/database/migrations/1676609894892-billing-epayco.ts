import { MigrationInterface, QueryRunner } from 'typeorm';

export class billingEpayco1676609894892 implements MigrationInterface {
  name = 'billingEpayco1676609894892';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "booking" DROP CONSTRAINT "FK_de8772edae117d01549b44e20c7"`,
    );
    await queryRunner.query(
      `CREATE TABLE "epayco" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "ref_payco" character varying NOT NULL, "factura" character varying NOT NULL, "descripcion" character varying NOT NULL, "valor" integer NOT NULL, "iva" integer NOT NULL, "ico" integer NOT NULL, "baseiva" integer NOT NULL, "valorneto" integer NOT NULL, "moneda" character varying NOT NULL, "banco" character varying NOT NULL, "estado" character varying NOT NULL, "respuesta" character varying NOT NULL, "autorizacion" character varying NOT NULL, "recibo" character varying NOT NULL, "fecha" character varying NOT NULL, "franquicia" character varying NOT NULL, "cod_respuesta" integer NOT NULL, "cod_error" character varying NOT NULL, "ip" character varying NOT NULL, "enpruebas" integer NOT NULL, "tipo_doc" character varying NOT NULL, "documento" character varying NOT NULL, "nombres" character varying NOT NULL, "apellidos" character varying NOT NULL, "email" character varying NOT NULL, "ciudad" character varying NOT NULL, "direccion" character varying NOT NULL, "ind_pais" character varying NOT NULL, "country_card" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "deleted_at" TIMESTAMP, CONSTRAINT "PK_2f775c37e8a9fac06bb14cda6ba" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "billing" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "doc_type" character varying NOT NULL, "doc_number" character varying NOT NULL, "name" character varying NOT NULL, "last_name" character varying NOT NULL, "email" character varying NOT NULL, "phone" character varying NOT NULL, "card_token_id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "deleted_at" TIMESTAMP WITH TIME ZONE, "profileId" uuid, CONSTRAINT "PK_d9043caf3033c11ed3d1b29f73c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "booking" DROP COLUMN "tripp"`);
    await queryRunner.query(`ALTER TABLE "booking" DROP COLUMN "value"`);
    await queryRunner.query(`ALTER TABLE "payment" ADD "booking" uuid`);
    await queryRunner.query(
      `ALTER TABLE "payment" ADD CONSTRAINT "UQ_41c6a6359db01ac92a0e2559a2c" UNIQUE ("booking")`,
    );
    await queryRunner.query(`ALTER TABLE "payment" ADD "epayco" uuid`);
    await queryRunner.query(
      `ALTER TABLE "payment" ADD CONSTRAINT "UQ_c75bc72b9c0c24909c66e99ccd2" UNIQUE ("epayco")`,
    );
    await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "state"`);
    await queryRunner.query(
      `CREATE TYPE "public"."payment_state_enum" AS ENUM('Pendiente', 'Aprobada', 'Rechazada')`,
    );
    await queryRunner.query(
      `ALTER TABLE "payment" ADD "state" "public"."payment_state_enum" NOT NULL DEFAULT 'Pendiente'`,
    );
    await queryRunner.query(
      `ALTER TABLE "payment" ADD CONSTRAINT "FK_41c6a6359db01ac92a0e2559a2c" FOREIGN KEY ("booking") REFERENCES "booking"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "payment" ADD CONSTRAINT "FK_c75bc72b9c0c24909c66e99ccd2" FOREIGN KEY ("epayco") REFERENCES "epayco"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "billing" ADD CONSTRAINT "FK_b922471ad02cdff7153b6216b4f" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "billing" DROP CONSTRAINT "FK_b922471ad02cdff7153b6216b4f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "payment" DROP CONSTRAINT "FK_c75bc72b9c0c24909c66e99ccd2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "payment" DROP CONSTRAINT "FK_41c6a6359db01ac92a0e2559a2c"`,
    );
    await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "state"`);
    await queryRunner.query(`DROP TYPE "public"."payment_state_enum"`);
    await queryRunner.query(
      `ALTER TABLE "payment" ADD "state" boolean DEFAULT true`,
    );
    await queryRunner.query(
      `ALTER TABLE "payment" DROP CONSTRAINT "UQ_c75bc72b9c0c24909c66e99ccd2"`,
    );
    await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "epayco"`);
    await queryRunner.query(
      `ALTER TABLE "payment" DROP CONSTRAINT "UQ_41c6a6359db01ac92a0e2559a2c"`,
    );
    await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "booking"`);
    await queryRunner.query(
      `ALTER TABLE "booking" ADD "value" integer NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "booking" ADD "tripp" uuid`);
    await queryRunner.query(`DROP TABLE "billing"`);
    await queryRunner.query(`DROP TABLE "epayco"`);
    await queryRunner.query(
      `ALTER TABLE "booking" ADD CONSTRAINT "FK_de8772edae117d01549b44e20c7" FOREIGN KEY ("tripp") REFERENCES "tripp"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
