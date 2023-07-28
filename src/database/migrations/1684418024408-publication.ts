import { MigrationInterface, QueryRunner } from 'typeorm';

export class Publication1684418024408 implements MigrationInterface {
  name = 'Publication1684418024408';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."media_type_enum" AS ENUM('SECUNDARY', 'PRIMARY', 'FRONT', 'DEFAULT')`,
    );
    await queryRunner.query(
      `CREATE TABLE "media" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "type" "public"."media_type_enum" NOT NULL DEFAULT 'DEFAULT', "url" text NOT NULL, "mimeType" text NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "deleted_at" TIMESTAMP WITH TIME ZONE, "publication" uuid, CONSTRAINT "PK_f4e0fcac36e050de337b670d8bd" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "publication" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "description" character varying, "ubication" character varying, "date" date, "hour" TIME, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "deleted_at" TIMESTAMP WITH TIME ZONE, "author_id" uuid, CONSTRAINT "PK_8aea8363d5213896a78d8365fab" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "media" ADD CONSTRAINT "FK_f5f77ff1bc7a177445c586e9d65" FOREIGN KEY ("publication") REFERENCES "publication"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "publication" ADD CONSTRAINT "FK_e552eece487b7576e383387a32c" FOREIGN KEY ("author_id") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "publication" DROP COLUMN "ubication"`,
    );
    await queryRunner.query(
      `ALTER TABLE "publication" ADD "longitud" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "publication" ADD "latitud" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "publication" DROP COLUMN "latitud"`);
    await queryRunner.query(`ALTER TABLE "publication" DROP COLUMN "longitud"`);
    await queryRunner.query(
      `ALTER TABLE "publication" ADD "ubication" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "publication" DROP CONSTRAINT "FK_e552eece487b7576e383387a32c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "media" DROP CONSTRAINT "FK_f5f77ff1bc7a177445c586e9d65"`,
    );
    await queryRunner.query(`DROP TABLE "publication"`);
    await queryRunner.query(`DROP TABLE "media"`);
    await queryRunner.query(`DROP TYPE "public"."media_type_enum"`);
  }
}
