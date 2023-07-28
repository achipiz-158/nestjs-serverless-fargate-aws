import { MigrationInterface, QueryRunner } from 'typeorm';

export class hostTable1668052266032 implements MigrationInterface {
  name = 'hostTable1668052266032';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "profile" DROP CONSTRAINT "FK_572de9e96808fe66e9fa73d23fc"`,
    );
    await queryRunner.query(
      `ALTER TABLE "profile_languages" DROP CONSTRAINT "FK_ac071dc85f089e1b9c2e56f7fb5"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."host_documenttype_enum" AS ENUM('Cédula ciudadania')`,
    );
    await queryRunner.query(
      `CREATE TABLE "host" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "account" numeric(10,0) NOT NULL, "front_identify" text NOT NULL, "back_identify" text NOT NULL, "documentType" "public"."host_documenttype_enum" NOT NULL, "document" integer NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "city" uuid, CONSTRAINT "UQ_1aa875956d5cb7745e1f87f975c" UNIQUE ("document"), CONSTRAINT "PK_44424c24c2f9b1d7bbf8721f4c4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "profile" DROP COLUMN "documentType"`);
    await queryRunner.query(`DROP TYPE "public"."profile_documenttype_enum"`);
    await queryRunner.query(
      `ALTER TABLE "profile" DROP CONSTRAINT "UQ_8ab1f184e61a1b22c7e0c297f61"`,
    );
    await queryRunner.query(`ALTER TABLE "profile" DROP COLUMN "document"`);
    await queryRunner.query(`ALTER TABLE "profile" DROP COLUMN "age"`);
    await queryRunner.query(`ALTER TABLE "profile" DROP COLUMN "city"`);
    await queryRunner.query(
      `ALTER TABLE "host" ADD CONSTRAINT "FK_7e6440809a334d4bb1e15c93701" FOREIGN KEY ("city") REFERENCES "city"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "profile_languages" ADD CONSTRAINT "FK_ac071dc85f089e1b9c2e56f7fb5" FOREIGN KEY ("profile_id") REFERENCES "host"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "profile_languages" DROP CONSTRAINT "FK_ac071dc85f089e1b9c2e56f7fb5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "host" DROP CONSTRAINT "FK_7e6440809a334d4bb1e15c93701"`,
    );
    await queryRunner.query(`ALTER TABLE "profile" ADD "city" uuid`);
    await queryRunner.query(`ALTER TABLE "profile" ADD "age" integer NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "profile" ADD "document" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "profile" ADD CONSTRAINT "UQ_8ab1f184e61a1b22c7e0c297f61" UNIQUE ("document")`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."profile_documenttype_enum" AS ENUM('Cédula ciudadania')`,
    );
    await queryRunner.query(
      `ALTER TABLE "profile" ADD "documentType" "public"."profile_documenttype_enum" NOT NULL`,
    );
    await queryRunner.query(`DROP TABLE "host"`);
    await queryRunner.query(`DROP TYPE "public"."host_documenttype_enum"`);
    await queryRunner.query(
      `ALTER TABLE "profile_languages" ADD CONSTRAINT "FK_ac071dc85f089e1b9c2e56f7fb5" FOREIGN KEY ("profile_id") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "profile" ADD CONSTRAINT "FK_572de9e96808fe66e9fa73d23fc" FOREIGN KEY ("city") REFERENCES "city"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
