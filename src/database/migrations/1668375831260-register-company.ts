import { MigrationInterface, QueryRunner } from 'typeorm';

export class registerCompany1668375831260 implements MigrationInterface {
  name = 'registerCompany1668375831260';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "company" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "NIT" integer NOT NULL, "email_company" character varying(50) NOT NULL, "RUT" text NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "host" uuid, CONSTRAINT "REL_a1f572a6cfe9a74ba9e757af1f" UNIQUE ("host"), CONSTRAINT "PK_056f7854a7afdba7cbd6d45fc20" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "company" ADD CONSTRAINT "FK_a1f572a6cfe9a74ba9e757af1f4" FOREIGN KEY ("host") REFERENCES "host"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "company" DROP CONSTRAINT "FK_a1f572a6cfe9a74ba9e757af1f4"`,
    );
    await queryRunner.query(`DROP TABLE "company"`);
  }
}
