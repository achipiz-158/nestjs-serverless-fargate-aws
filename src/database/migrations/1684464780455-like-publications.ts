import { MigrationInterface, QueryRunner } from 'typeorm';

export class LikePublications1684464780455 implements MigrationInterface {
  name = 'LikePublications1684464780455';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "like_publication" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "publication_id" uuid, "profile_id" uuid, CONSTRAINT "PK_6d47f5d8f82d6a4c5be1b80e347" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "like_publication" ADD CONSTRAINT "FK_c6b1301b7b2240f0c61b9de82f9" FOREIGN KEY ("publication_id") REFERENCES "publication"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "like_publication" ADD CONSTRAINT "FK_5c84c3006923ac9683c19bd8dd7" FOREIGN KEY ("profile_id") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "like_publication" DROP CONSTRAINT "FK_5c84c3006923ac9683c19bd8dd7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "like_publication" DROP CONSTRAINT "FK_c6b1301b7b2240f0c61b9de82f9"`,
    );
    await queryRunner.query(`DROP TABLE "like_publication"`);
  }
}
