import { MigrationInterface, QueryRunner } from 'typeorm';

export class FavoritePublication1685646472818 implements MigrationInterface {
  name = 'FavoritePublication1685646472818';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "favorite_publication" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "publication_id" uuid NOT NULL, "profile_id" uuid NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_d2b2bd076bb5d000db42e2d2062" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorite_publication" ADD CONSTRAINT "FK_56f14eb10cf0af10521eea4e89d" FOREIGN KEY ("publication_id") REFERENCES "publication"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorite_publication" ADD CONSTRAINT "FK_ece3f385b4768d1e9cad44245e4" FOREIGN KEY ("profile_id") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "favorite_publication" DROP CONSTRAINT "FK_ece3f385b4768d1e9cad44245e4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorite_publication" DROP CONSTRAINT "FK_56f14eb10cf0af10521eea4e89d"`,
    );
    await queryRunner.query(`DROP TABLE "favorite_publication"`);
  }
}
