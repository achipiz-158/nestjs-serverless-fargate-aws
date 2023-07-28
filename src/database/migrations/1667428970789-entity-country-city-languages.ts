import { MigrationInterface, QueryRunner } from 'typeorm';

export class entityCountryCityLanguages1667428970789
  implements MigrationInterface
{
  name = 'entityCountryCityLanguages1667428970789';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "language" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "sub" character varying(5) NOT NULL, "name" character varying(30) NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "deleted_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_cc0a99e710eb3733f6fb42b1d4c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "country" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "deleted_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_bf6e37c231c4f4ea56dcd887269" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "city" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "deleted_at" TIMESTAMP WITH TIME ZONE, "countryId" uuid, CONSTRAINT "PK_b222f51ce26f7e5ca86944a6739" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "profile_languages" ("profile_id" uuid NOT NULL, "language_id" uuid NOT NULL, CONSTRAINT "PK_e87da52d925cb2bfeebbc91abb1" PRIMARY KEY ("profile_id", "language_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_ac071dc85f089e1b9c2e56f7fb" ON "profile_languages" ("profile_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_eb90ad1550a4605c28e750b4c9" ON "profile_languages" ("language_id") `,
    );
    await queryRunner.query(`ALTER TABLE "profile" ADD "cityId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "city" ADD CONSTRAINT "FK_990b8a57ab901cb812e2b52fcf0" FOREIGN KEY ("countryId") REFERENCES "country"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "profile" ADD CONSTRAINT "FK_350e025f4336b40a3c876ee9e33" FOREIGN KEY ("cityId") REFERENCES "city"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "profile_languages" ADD CONSTRAINT "FK_ac071dc85f089e1b9c2e56f7fb5" FOREIGN KEY ("profile_id") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "profile_languages" ADD CONSTRAINT "FK_eb90ad1550a4605c28e750b4c91" FOREIGN KEY ("language_id") REFERENCES "language"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "profile_languages" DROP CONSTRAINT "FK_eb90ad1550a4605c28e750b4c91"`,
    );
    await queryRunner.query(
      `ALTER TABLE "profile_languages" DROP CONSTRAINT "FK_ac071dc85f089e1b9c2e56f7fb5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "profile" DROP CONSTRAINT "FK_350e025f4336b40a3c876ee9e33"`,
    );
    await queryRunner.query(
      `ALTER TABLE "city" DROP CONSTRAINT "FK_990b8a57ab901cb812e2b52fcf0"`,
    );
    await queryRunner.query(`ALTER TABLE "profile" DROP COLUMN "cityId"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_eb90ad1550a4605c28e750b4c9"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_ac071dc85f089e1b9c2e56f7fb"`,
    );
    await queryRunner.query(`DROP TABLE "profile_languages"`);
    await queryRunner.query(`DROP TABLE "city"`);
    await queryRunner.query(`DROP TABLE "country"`);
    await queryRunner.query(`DROP TABLE "language"`);
  }
}
