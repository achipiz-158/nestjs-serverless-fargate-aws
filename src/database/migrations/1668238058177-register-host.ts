import { MigrationInterface, QueryRunner } from 'typeorm';

export class registerHost1668238058177 implements MigrationInterface {
  name = 'registerHost1668238058177';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "host" DROP CONSTRAINT "FK_7e6440809a334d4bb1e15c93701"`,
    );
    await queryRunner.query(`ALTER TABLE "host" DROP COLUMN "account"`);
    await queryRunner.query(`ALTER TABLE "host" DROP COLUMN "city"`);
    await queryRunner.query(
      `ALTER TABLE "host" ADD "nequi" numeric(10,0) NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "host" ADD "profile_id" uuid`);
    await queryRunner.query(
      `ALTER TABLE "host" ADD CONSTRAINT "UQ_1ca1d89c1ee3e04e742d3b692e3" UNIQUE ("profile_id")`,
    );
    await queryRunner.query(`ALTER TABLE "profile" ADD "country" uuid`);
    await queryRunner.query(
      `ALTER TABLE "host" ALTER COLUMN "front_identify" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "host" ALTER COLUMN "back_identify" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "host" ADD CONSTRAINT "FK_1ca1d89c1ee3e04e742d3b692e3" FOREIGN KEY ("profile_id") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "profile" ADD CONSTRAINT "FK_90c128315eb3a8d1c0ff2228c1f" FOREIGN KEY ("country") REFERENCES "country"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "profile" DROP CONSTRAINT "FK_90c128315eb3a8d1c0ff2228c1f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "host" DROP CONSTRAINT "FK_1ca1d89c1ee3e04e742d3b692e3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "host" ALTER COLUMN "back_identify" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "host" ALTER COLUMN "front_identify" SET NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "profile" DROP COLUMN "country"`);
    await queryRunner.query(
      `ALTER TABLE "host" DROP CONSTRAINT "UQ_1ca1d89c1ee3e04e742d3b692e3"`,
    );
    await queryRunner.query(`ALTER TABLE "host" DROP COLUMN "profile_id"`);
    await queryRunner.query(`ALTER TABLE "host" DROP COLUMN "nequi"`);
    await queryRunner.query(`ALTER TABLE "host" ADD "city" uuid`);
    await queryRunner.query(
      `ALTER TABLE "host" ADD "account" numeric(10,0) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "host" ADD CONSTRAINT "FK_7e6440809a334d4bb1e15c93701" FOREIGN KEY ("city") REFERENCES "city"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
