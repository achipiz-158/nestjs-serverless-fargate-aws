import { MigrationInterface, QueryRunner } from 'typeorm';

export class CodeChangePassword1683229542322 implements MigrationInterface {
  name = 'CodeChangePassword1683229542322';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."code_type_enum" AS ENUM('email', 'password')`,
    );
    await queryRunner.query(
      `ALTER TABLE "code" ADD "type" "public"."code_type_enum" NOT NULL DEFAULT 'email'`,
    );
    await queryRunner.query(
      `ALTER TABLE "code" DROP CONSTRAINT "FK_d4407a419134321668e9e53e510"`,
    );
    await queryRunner.query(
      `ALTER TABLE "code" DROP CONSTRAINT "REL_d4407a419134321668e9e53e51"`,
    );
    await queryRunner.query(
      `ALTER TABLE "code" ADD CONSTRAINT "FK_d4407a419134321668e9e53e510" FOREIGN KEY ("profile_id") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "code" DROP CONSTRAINT "FK_d4407a419134321668e9e53e510"`,
    );
    await queryRunner.query(
      `ALTER TABLE "code" ADD CONSTRAINT "REL_d4407a419134321668e9e53e51" UNIQUE ("profile_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "code" ADD CONSTRAINT "FK_d4407a419134321668e9e53e510" FOREIGN KEY ("profile_id") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(`ALTER TABLE "code" DROP COLUMN "type"`);
    await queryRunner.query(`DROP TYPE "public"."code_type_enum"`);
  }
}
