import { MigrationInterface, QueryRunner } from 'typeorm';

export class ScoreHost1682443518983 implements MigrationInterface {
  name = 'ScoreHost1682443518983';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "score" DROP CONSTRAINT "FK_dd8c3fd279ff1e38653d8cd6f51"`,
    );
    await queryRunner.query(
      `ALTER TABLE "score" DROP CONSTRAINT "FK_28a5389596b4f8d723e1d63077d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "score" ALTER COLUMN "comment" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "score" ALTER COLUMN "trippter" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "score" ADD CONSTRAINT "FK_28a5389596b4f8d723e1d63077d" FOREIGN KEY ("trippter") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "score" ADD CONSTRAINT "FK_dd8c3fd279ff1e38653d8cd6f51" FOREIGN KEY ("host") REFERENCES "host"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "score" DROP CONSTRAINT "FK_dd8c3fd279ff1e38653d8cd6f51"`,
    );
    await queryRunner.query(
      `ALTER TABLE "score" DROP CONSTRAINT "FK_28a5389596b4f8d723e1d63077d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "score" ALTER COLUMN "trippter" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "score" ALTER COLUMN "comment" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "score" ADD CONSTRAINT "FK_28a5389596b4f8d723e1d63077d" FOREIGN KEY ("trippter") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "score" ADD CONSTRAINT "FK_dd8c3fd279ff1e38653d8cd6f51" FOREIGN KEY ("host") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
