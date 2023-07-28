import { MigrationInterface, QueryRunner } from 'typeorm';

export class UbicationPublication1685466890899 implements MigrationInterface {
  name = 'UbicationPublication1685466890899';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "like_publication" DROP CONSTRAINT "FK_5c84c3006923ac9683c19bd8dd7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "like_publication" DROP CONSTRAINT "FK_c6b1301b7b2240f0c61b9de82f9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "like_publication" DROP COLUMN "updated_at"`,
    );
    await queryRunner.query(`ALTER TABLE "publication" DROP COLUMN "longitud"`);
    await queryRunner.query(`ALTER TABLE "publication" DROP COLUMN "latitud"`);
    await queryRunner.query(
      `ALTER TABLE "publication" ADD "meeting_point" geography(Point,4326)`,
    );
    await queryRunner.query(
      `ALTER TABLE "like_publication" ALTER COLUMN "publication_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "like_publication" ALTER COLUMN "profile_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_bff427c463a326e11de5975b2a" ON "publication" USING GiST ("meeting_point") `,
    );
    await queryRunner.query(
      `ALTER TABLE "like_publication" ADD CONSTRAINT "FK_2fd942db56e441c81d24a109488" FOREIGN KEY ("publication_id") REFERENCES "publication"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "like_publication" ADD CONSTRAINT "FK_04bdc04f5a6c47f82d74caab322" FOREIGN KEY ("profile_id") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "like_publication" DROP CONSTRAINT "FK_04bdc04f5a6c47f82d74caab322"`,
    );
    await queryRunner.query(
      `ALTER TABLE "like_publication" DROP CONSTRAINT "FK_2fd942db56e441c81d24a109488"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_bff427c463a326e11de5975b2a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "like_publication" ALTER COLUMN "profile_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "like_publication" ALTER COLUMN "publication_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "publication" DROP COLUMN "meeting_point"`,
    );
    await queryRunner.query(
      `ALTER TABLE "publication" ADD "latitud" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "publication" ADD "longitud" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "like_publication" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`,
    );
    await queryRunner.query(
      `ALTER TABLE "like_publication" ADD CONSTRAINT "FK_c6b1301b7b2240f0c61b9de82f9" FOREIGN KEY ("publication_id") REFERENCES "publication"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "like_publication" ADD CONSTRAINT "FK_5c84c3006923ac9683c19bd8dd7" FOREIGN KEY ("profile_id") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
