import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateProcedure1686721234835 implements MigrationInterface {
    name = 'UpdateProcedure1686721234835'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "procedure" DROP CONSTRAINT "FK_b57f85f07a7c98d0f6b0f791d50"`);
        await queryRunner.query(`ALTER TABLE "procedure" RENAME COLUMN "cancellation_id" TO "cancellation"`);
        await queryRunner.query(`ALTER TABLE "procedure" ADD CONSTRAINT "FK_f5005afc982a3129a133aa58aad" FOREIGN KEY ("cancellation") REFERENCES "cancellation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "procedure" DROP CONSTRAINT "FK_f5005afc982a3129a133aa58aad"`);
        await queryRunner.query(`ALTER TABLE "procedure" RENAME COLUMN "cancellation" TO "cancellation_id"`);
        await queryRunner.query(`ALTER TABLE "procedure" ADD CONSTRAINT "FK_b57f85f07a7c98d0f6b0f791d50" FOREIGN KEY ("cancellation_id") REFERENCES "cancellation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
