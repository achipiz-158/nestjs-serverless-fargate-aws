import { MigrationInterface, QueryRunner } from 'typeorm';

export class SetCategories1681832797679 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO category (name) VALUES ('Turismo Urbano')`,
    );
    await queryRunner.query(
      `INSERT INTO category (name) VALUES ('Turismo Verde')`,
    );
    await queryRunner.query(
      `INSERT INTO category (name) VALUES ('Turismo de Playa')`,
    );
    await queryRunner.query(
      `INSERT INTO category (name) VALUES ('Etnoturismo')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM category WHERE name = 'Turismo Urbano'`,
    );
    await queryRunner.query(
      `DELETE FROM category WHERE name = 'Turismo Verde'`,
    );
    await queryRunner.query(
      `DELETE FROM category WHERE name = 'Turismo de Playa'`,
    );
    await queryRunner.query(`DELETE FROM category WHERE name = 'Etnoturismo'`);
  }
}
