import { MigrationInterface, QueryRunner } from 'typeorm';

export class HostKeyFiles1686774249583 implements MigrationInterface {
  name = 'HostKeyFiles1686774249583';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "host" ADD "front_identify_key" text`);
    await queryRunner.query(`ALTER TABLE "host" ADD "back_identify_key" text`);
    await queryRunner.query(`ALTER TABLE "host" ADD "RUT_key" text`);
    await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "comment_id"`);
    await queryRunner.query(
      `ALTER TABLE "comment" ADD "comment_id" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "host" ALTER COLUMN "documentType" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "host" ALTER COLUMN "document" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment" ADD CONSTRAINT "FK_6a9f9bf1cf9a09107d3224a0e9a" FOREIGN KEY ("comment_id") REFERENCES "comment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "comment" DROP CONSTRAINT "FK_6a9f9bf1cf9a09107d3224a0e9a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "host" ALTER COLUMN "document" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "host" ALTER COLUMN "documentType" SET NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "comment_id"`);
    await queryRunner.query(
      `ALTER TABLE "comment" ADD "comment_id" character varying`,
    );
    await queryRunner.query(`ALTER TABLE "host" DROP COLUMN "RUT_key"`);
    await queryRunner.query(
      `ALTER TABLE "host" DROP COLUMN "back_identify_key"`,
    );
    await queryRunner.query(
      `ALTER TABLE "host" DROP COLUMN "front_identify_key"`,
    );
  }
}
