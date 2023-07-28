import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTablePrueba1689267170325 implements MigrationInterface {
    name = 'CreateTablePrueba1689267170325'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "like_publication" DROP CONSTRAINT "FK_2fd942db56e441c81d24a109488"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_e76fc61accb571a4755817a27bd"`);
        await queryRunner.query(`ALTER TABLE "tag" DROP CONSTRAINT "FK_7b3a189f59f3ce2080cb5ef17bd"`);
        await queryRunner.query(`ALTER TABLE "like_publication" ADD CONSTRAINT "FK_2fd942db56e441c81d24a109488" FOREIGN KEY ("publication_id") REFERENCES "publication"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_e76fc61accb571a4755817a27bd" FOREIGN KEY ("publication_id") REFERENCES "publication"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tag" ADD CONSTRAINT "FK_7b3a189f59f3ce2080cb5ef17bd" FOREIGN KEY ("publication_id") REFERENCES "publication"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tag" DROP CONSTRAINT "FK_7b3a189f59f3ce2080cb5ef17bd"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_e76fc61accb571a4755817a27bd"`);
        await queryRunner.query(`ALTER TABLE "like_publication" DROP CONSTRAINT "FK_2fd942db56e441c81d24a109488"`);
        await queryRunner.query(`ALTER TABLE "tag" ADD CONSTRAINT "FK_7b3a189f59f3ce2080cb5ef17bd" FOREIGN KEY ("publication_id") REFERENCES "publication"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_e76fc61accb571a4755817a27bd" FOREIGN KEY ("publication_id") REFERENCES "publication"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "like_publication" ADD CONSTRAINT "FK_2fd942db56e441c81d24a109488" FOREIGN KEY ("publication_id") REFERENCES "publication"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
