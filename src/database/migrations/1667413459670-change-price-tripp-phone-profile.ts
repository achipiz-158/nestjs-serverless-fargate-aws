import { MigrationInterface, QueryRunner } from 'typeorm';

export class changePriceTrippPhoneProfile1667413459670
  implements MigrationInterface
{
  name = 'changePriceTrippPhoneProfile1667413459670';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TYPE "public"."profile_gender_enum" RENAME TO "profile_gender_enum_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."profile_gender_enum" AS ENUM('MALE', 'FEMALE', 'OTHER')`,
    );
    await queryRunner.query(
      `ALTER TABLE "profile" ALTER COLUMN "gender" TYPE "public"."profile_gender_enum" USING "gender"::"text"::"public"."profile_gender_enum"`,
    );
    await queryRunner.query(`DROP TYPE "public"."profile_gender_enum_old"`);
    await queryRunner.query(`ALTER TABLE "profile" DROP COLUMN "phone"`);
    await queryRunner.query(
      `ALTER TABLE "profile" ADD "phone" numeric(10,0) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "tripp" ALTER COLUMN "name" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "tripp" DROP CONSTRAINT "UQ_ce4ff7c399ac7411dd0fea680b0"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tripp" ADD CONSTRAINT "UQ_ce4ff7c399ac7411dd0fea680b0" UNIQUE ("price")`,
    );
    await queryRunner.query(
      `ALTER TABLE "tripp" ALTER COLUMN "name" SET NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "profile" DROP COLUMN "phone"`);
    await queryRunner.query(
      `ALTER TABLE "profile" ADD "phone" integer NOT NULL`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."profile_gender_enum_old" AS ENUM('MALE', 'FEMALE')`,
    );
    await queryRunner.query(
      `ALTER TABLE "profile" ALTER COLUMN "gender" TYPE "public"."profile_gender_enum_old" USING "gender"::"text"::"public"."profile_gender_enum_old"`,
    );
    await queryRunner.query(`DROP TYPE "public"."profile_gender_enum"`);
    await queryRunner.query(
      `ALTER TYPE "public"."profile_gender_enum_old" RENAME TO "profile_gender_enum"`,
    );
  }
}
