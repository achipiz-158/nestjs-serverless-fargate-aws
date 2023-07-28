import { MigrationInterface, QueryRunner } from 'typeorm';

export class SetRoles1683578714929 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`INSERT INTO role (rol) VALUES ('ADMIN')`);
    await queryRunner.query(`INSERT INTO role (rol) VALUES ('TRIPPSTER')`);
    await queryRunner.query(`INSERT INTO role (rol) VALUES ('HOST')`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM role WHERE rol = 'ADMIN'`);
    await queryRunner.query(`DELETE FROM role WHERE rol = 'TRIPPSTER'`);
    await queryRunner.query(`DELETE FROM role WHERE rol = 'HOST'`);
  }
}
