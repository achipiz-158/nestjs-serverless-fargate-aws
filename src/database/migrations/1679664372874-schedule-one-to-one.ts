import { MigrationInterface, QueryRunner } from 'typeorm';

export class scheduleOneToOne1679664372874 implements MigrationInterface {
  name = 'scheduleOneToOne1679664372874';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "schedule" DROP CONSTRAINT "FK_09138b09647988dc954f1f08849"`,
    );
    await queryRunner.query(
      `ALTER TABLE "schedule" ADD CONSTRAINT "UQ_09138b09647988dc954f1f08849" UNIQUE ("tripp")`,
    );
    await queryRunner.query(
      `ALTER TABLE "schedule" ADD CONSTRAINT "FK_09138b09647988dc954f1f08849" FOREIGN KEY ("tripp") REFERENCES "tripp"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "schedule" DROP CONSTRAINT "FK_09138b09647988dc954f1f08849"`,
    );
    await queryRunner.query(
      `ALTER TABLE "schedule" DROP CONSTRAINT "UQ_09138b09647988dc954f1f08849"`,
    );
    await queryRunner.query(
      `ALTER TABLE "schedule" ADD CONSTRAINT "FK_09138b09647988dc954f1f08849" FOREIGN KEY ("tripp") REFERENCES "tripp"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
