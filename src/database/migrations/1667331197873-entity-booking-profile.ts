import { MigrationInterface, QueryRunner } from 'typeorm';

export class entityBookingProfile1667331197873 implements MigrationInterface {
  name = 'entityBookingProfile1667331197873';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "follow" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "followerId" uuid, "followedId" uuid, CONSTRAINT "PK_fda88bc28a84d2d6d06e19df6e5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "blocked" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "blockedId" uuid, "blockerId" uuid, CONSTRAINT "PK_537b196b5b7e6aa56b637963a1e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "role" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "rol" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."profile_documenttype_enum" AS ENUM('Cédula ciudadania')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."profile_gender_enum" AS ENUM('MALE', 'FEMALE')`,
    );
    await queryRunner.query(
      `CREATE TABLE "profile" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "account" text NOT NULL, "name" text NOT NULL, "lastname" text NOT NULL, "documentType" "public"."profile_documenttype_enum" NOT NULL, "document" integer NOT NULL, "age" integer NOT NULL, "gender" "public"."profile_gender_enum" NOT NULL, "date_of_birth" TIMESTAMP WITH TIME ZONE NOT NULL, "prefix" character varying NOT NULL, "phone" integer NOT NULL, "img" text NOT NULL, "profession" text, "verified_host" boolean NOT NULL DEFAULT false, "verified_email" boolean NOT NULL DEFAULT false, "verified_phone" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "UQ_8ab1f184e61a1b22c7e0c297f61" UNIQUE ("document"), CONSTRAINT "PK_3dd8bfc97e4a77c70971591bdcb" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."cancellation_state_enum" AS ENUM('no cancellable', 'in review', 'rejected', 'cancellation expired term', 'canceled by host', ' cancellation with refund', 'accepted by the administrator')`,
    );
    await queryRunner.query(
      `CREATE TABLE "cancellation" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "state" "public"."cancellation_state_enum", "reason" text NOT NULL, "date" TIMESTAMP WITH TIME ZONE, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_6919f7c7b98a1114153d4e9d5f6" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."booking_state_enum" AS ENUM('reserved', 'confirmed', 'rejected', 'cancelled', 'prebooked')`,
    );
    await queryRunner.query(
      `CREATE TABLE "booking" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "state" "public"."booking_state_enum" NOT NULL DEFAULT 'prebooked', "attendees" integer NOT NULL, "date" TIMESTAMP WITH TIME ZONE NOT NULL, "value" integer NOT NULL, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "cancellation_id" uuid, "userId" uuid, "trippId" uuid, CONSTRAINT "REL_7459a1d12031844a762e83c3ae" UNIQUE ("cancellation_id"), CONSTRAINT "PK_49171efc69702ed84c812f33540" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "profile_role" ("profile_id" uuid NOT NULL, "role_id" uuid NOT NULL, CONSTRAINT "PK_be0a4fd14a86da94610d9df3da2" PRIMARY KEY ("profile_id", "role_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_a5b52a55a7ff76bd9438a48029" ON "profile_role" ("profile_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_d4d5eee865c52d24a2f42a640f" ON "profile_role" ("role_id") `,
    );
    await queryRunner.query(`ALTER TABLE "tripp" ADD "hostId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "follow" ADD CONSTRAINT "FK_550dce89df9570f251b6af2665a" FOREIGN KEY ("followerId") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "follow" ADD CONSTRAINT "FK_f4a9d59861c87ba252ead40d84d" FOREIGN KEY ("followedId") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "blocked" ADD CONSTRAINT "FK_387464f4c4d253c8f2ee1412121" FOREIGN KEY ("blockedId") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "blocked" ADD CONSTRAINT "FK_68a0cdaec5cd36a82c12e12a623" FOREIGN KEY ("blockerId") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "tripp" ADD CONSTRAINT "FK_76131ca5c3a4e0a952c195449bd" FOREIGN KEY ("hostId") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "booking" ADD CONSTRAINT "FK_7459a1d12031844a762e83c3ae2" FOREIGN KEY ("cancellation_id") REFERENCES "cancellation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "booking" ADD CONSTRAINT "FK_336b3f4a235460dc93645fbf222" FOREIGN KEY ("userId") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "booking" ADD CONSTRAINT "FK_2c696e6e41f8cdd8b6f8b1d6517" FOREIGN KEY ("trippId") REFERENCES "tripp"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "profile_role" ADD CONSTRAINT "FK_a5b52a55a7ff76bd9438a48029e" FOREIGN KEY ("profile_id") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "profile_role" ADD CONSTRAINT "FK_d4d5eee865c52d24a2f42a640fc" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "profile_role" DROP CONSTRAINT "FK_d4d5eee865c52d24a2f42a640fc"`,
    );
    await queryRunner.query(
      `ALTER TABLE "profile_role" DROP CONSTRAINT "FK_a5b52a55a7ff76bd9438a48029e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "booking" DROP CONSTRAINT "FK_2c696e6e41f8cdd8b6f8b1d6517"`,
    );
    await queryRunner.query(
      `ALTER TABLE "booking" DROP CONSTRAINT "FK_336b3f4a235460dc93645fbf222"`,
    );
    await queryRunner.query(
      `ALTER TABLE "booking" DROP CONSTRAINT "FK_7459a1d12031844a762e83c3ae2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tripp" DROP CONSTRAINT "FK_76131ca5c3a4e0a952c195449bd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "blocked" DROP CONSTRAINT "FK_68a0cdaec5cd36a82c12e12a623"`,
    );
    await queryRunner.query(
      `ALTER TABLE "blocked" DROP CONSTRAINT "FK_387464f4c4d253c8f2ee1412121"`,
    );
    await queryRunner.query(
      `ALTER TABLE "follow" DROP CONSTRAINT "FK_f4a9d59861c87ba252ead40d84d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "follow" DROP CONSTRAINT "FK_550dce89df9570f251b6af2665a"`,
    );
    await queryRunner.query(`ALTER TABLE "tripp" DROP COLUMN "hostId"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_d4d5eee865c52d24a2f42a640f"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_a5b52a55a7ff76bd9438a48029"`,
    );
    await queryRunner.query(`DROP TABLE "profile_role"`);
    await queryRunner.query(`DROP TABLE "booking"`);
    await queryRunner.query(`DROP TYPE "public"."booking_state_enum"`);
    await queryRunner.query(`DROP TABLE "cancellation"`);
    await queryRunner.query(`DROP TYPE "public"."cancellation_state_enum"`);
    await queryRunner.query(`DROP TABLE "profile"`);
    await queryRunner.query(`DROP TYPE "public"."profile_gender_enum"`);
    await queryRunner.query(`DROP TYPE "public"."profile_documenttype_enum"`);
    await queryRunner.query(`DROP TABLE "role"`);
    await queryRunner.query(`DROP TABLE "blocked"`);
    await queryRunner.query(`DROP TABLE "follow"`);
  }
}
