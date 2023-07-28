import { MigrationInterface, QueryRunner } from 'typeorm';

export class FavoriteTripp1681737720262 implements MigrationInterface {
  name = 'FavoriteTripp1681737720262';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "favorite" DROP CONSTRAINT "FK_dcc07db15c21779a7b4eb477bd8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tripp" DROP CONSTRAINT "FK_e54ad94ccc21a358be279626e51"`,
    );
    await queryRunner.query(`ALTER TABLE "favorite" DROP COLUMN "follower"`);
    await queryRunner.query(`ALTER TABLE "tripp" DROP COLUMN "favorite"`);
    await queryRunner.query(`ALTER TABLE "favorite" ADD "profile" uuid`);
    await queryRunner.query(`ALTER TABLE "favorite" ADD "tripp" uuid`);
    await queryRunner.query(
      `ALTER TABLE "favorite" ADD CONSTRAINT "FK_94a4325dddea23180b5dbe3a57b" FOREIGN KEY ("profile") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorite" ADD CONSTRAINT "FK_d4c645fe3421075936642168e21" FOREIGN KEY ("tripp") REFERENCES "tripp"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "favorite" DROP CONSTRAINT "FK_d4c645fe3421075936642168e21"`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorite" DROP CONSTRAINT "FK_94a4325dddea23180b5dbe3a57b"`,
    );
    await queryRunner.query(`ALTER TABLE "favorite" DROP COLUMN "tripp"`);
    await queryRunner.query(`ALTER TABLE "favorite" DROP COLUMN "profile"`);
    await queryRunner.query(`ALTER TABLE "tripp" ADD "favorite" uuid`);
    await queryRunner.query(`ALTER TABLE "favorite" ADD "follower" uuid`);
    await queryRunner.query(
      `ALTER TABLE "tripp" ADD CONSTRAINT "FK_e54ad94ccc21a358be279626e51" FOREIGN KEY ("favorite") REFERENCES "favorite"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorite" ADD CONSTRAINT "FK_dcc07db15c21779a7b4eb477bd8" FOREIGN KEY ("follower") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
