import { MigrationInterface, QueryRunner } from 'typeorm';

export class CartEntity1682714580034 implements MigrationInterface {
  name = 'CartEntity1682714580034';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "score" DROP CONSTRAINT "FK_dd8c3fd279ff1e38653d8cd6f51"`,
    );
    await queryRunner.query(
      `CREATE TABLE "cart" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "isSelect" boolean NOT NULL DEFAULT false, "attendees" integer NOT NULL, "date" TIMESTAMP WITH TIME ZONE NOT NULL, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "profile" uuid, "week" uuid, CONSTRAINT "PK_c524ec48751b9b5bcfbf6e59be7" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "profile" ADD "bio" text`);
    await queryRunner.query(
      `ALTER TABLE "score" ALTER COLUMN "comment" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "score" ADD CONSTRAINT "FK_dd8c3fd279ff1e38653d8cd6f51" FOREIGN KEY ("host") REFERENCES "host"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "cart" ADD CONSTRAINT "FK_063cf26200f67b4e734fc84d1e4" FOREIGN KEY ("profile") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "cart" ADD CONSTRAINT "FK_f84e4785ef2ce4f45bd3994dc2b" FOREIGN KEY ("week") REFERENCES "week"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "cart" DROP CONSTRAINT "FK_f84e4785ef2ce4f45bd3994dc2b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "cart" DROP CONSTRAINT "FK_063cf26200f67b4e734fc84d1e4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "score" DROP CONSTRAINT "FK_dd8c3fd279ff1e38653d8cd6f51"`,
    );
    await queryRunner.query(
      `ALTER TABLE "score" ALTER COLUMN "comment" DROP NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "profile" DROP COLUMN "bio"`);
    await queryRunner.query(`DROP TABLE "cart"`);
    await queryRunner.query(
      `ALTER TABLE "score" ADD CONSTRAINT "FK_dd8c3fd279ff1e38653d8cd6f51" FOREIGN KEY ("host") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
