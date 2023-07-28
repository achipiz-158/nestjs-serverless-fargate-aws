import { MigrationInterface, QueryRunner } from 'typeorm';

export class Metadata1681157341226 implements MigrationInterface {
  name = 'Metadata1681157341226';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "metadata" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "version_host" character varying NOT NULL, "version_trippster" character varying NOT NULL, "token_epayco" character varying NOT NULL, CONSTRAINT "PK_56b22355e89941b9792c04ab176" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "metadata"`);
  }
}
