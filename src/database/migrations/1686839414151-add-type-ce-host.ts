import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTypeCeHost1686839414151 implements MigrationInterface {
  name = 'AddTypeCeHost1686839414151';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TYPE "public"."host_documenttype_enum" RENAME TO "host_documenttype_enum_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."host_documenttype_enum" AS ENUM('Cédula ciudadania', 'Cédula extranjería')`,
    );
    await queryRunner.query(
      `ALTER TABLE "host" ALTER COLUMN "documentType" TYPE "public"."host_documenttype_enum" USING "documentType"::"text"::"public"."host_documenttype_enum"`,
    );
    await queryRunner.query(`DROP TYPE "public"."host_documenttype_enum_old"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."host_documenttype_enum_old" AS ENUM('Cédula ciudadania')`,
    );
    await queryRunner.query(
      `ALTER TABLE "host" ALTER COLUMN "documentType" TYPE "public"."host_documenttype_enum_old" USING "documentType"::"text"::"public"."host_documenttype_enum_old"`,
    );
    await queryRunner.query(`DROP TYPE "public"."host_documenttype_enum"`);
    await queryRunner.query(
      `ALTER TYPE "public"."host_documenttype_enum_old" RENAME TO "host_documenttype_enum"`,
    );
  }
}
