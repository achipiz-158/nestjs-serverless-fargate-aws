import { MigrationInterface, QueryRunner } from 'typeorm';

export class init1666972236488 implements MigrationInterface {
  name = 'init1666972236488';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "tripp" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, "languages" character varying(50) NOT NULL, "price" integer NOT NULL, "contents" text NOT NULL, "recommendations" text NOT NULL, "minutes" integer NOT NULL, "country" character varying(150) NOT NULL, "city" text NOT NULL, "meetingPoint" point NOT NULL, "careStartDate" TIMESTAMP WITH TIME ZONE NOT NULL, "careEndDate" TIMESTAMP WITH TIME ZONE NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_ce4ff7c399ac7411dd0fea680b0" UNIQUE ("price"), CONSTRAINT "PK_064e53857df2d76276a504d9b65" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "tripp"`);
  }
}
