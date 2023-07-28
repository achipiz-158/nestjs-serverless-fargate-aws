import { MigrationInterface, QueryRunner } from 'typeorm';

export class camelcaseToUnderscore1668009535030 implements MigrationInterface {
  name = 'camelcaseToUnderscore1668009535030';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "gallery" DROP CONSTRAINT "FK_16ea92d3096eeb52e572b7c3d3a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "schedule" DROP CONSTRAINT "FK_03f227c93edde8b957e0a6c7c07"`,
    );
    await queryRunner.query(
      `ALTER TABLE "follow" DROP CONSTRAINT "FK_550dce89df9570f251b6af2665a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "follow" DROP CONSTRAINT "FK_f4a9d59861c87ba252ead40d84d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "blocked" DROP CONSTRAINT "FK_387464f4c4d253c8f2ee1412121"`,
    );
    await queryRunner.query(
      `ALTER TABLE "blocked" DROP CONSTRAINT "FK_68a0cdaec5cd36a82c12e12a623"`,
    );
    await queryRunner.query(
      `ALTER TABLE "city" DROP CONSTRAINT "FK_990b8a57ab901cb812e2b52fcf0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "profile" DROP CONSTRAINT "FK_350e025f4336b40a3c876ee9e33"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tripp" DROP CONSTRAINT "FK_76131ca5c3a4e0a952c195449bd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "booking" DROP CONSTRAINT "FK_336b3f4a235460dc93645fbf222"`,
    );
    await queryRunner.query(
      `ALTER TABLE "booking" DROP CONSTRAINT "FK_2c696e6e41f8cdd8b6f8b1d6517"`,
    );
    await queryRunner.query(
      `ALTER TABLE "gallery" RENAME COLUMN "trippId" TO "tripp"`,
    );
    await queryRunner.query(
      `ALTER TABLE "schedule" RENAME COLUMN "trippId" TO "tripp"`,
    );
    await queryRunner.query(
      `ALTER TABLE "city" RENAME COLUMN "countryId" TO "country_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "profile" RENAME COLUMN "cityId" TO "city"`,
    );
    await queryRunner.query(`ALTER TABLE "follow" DROP COLUMN "followerId"`);
    await queryRunner.query(`ALTER TABLE "follow" DROP COLUMN "followedId"`);
    await queryRunner.query(`ALTER TABLE "blocked" DROP COLUMN "blockedId"`);
    await queryRunner.query(`ALTER TABLE "blocked" DROP COLUMN "blockerId"`);
    await queryRunner.query(`ALTER TABLE "tripp" DROP COLUMN "meetingPoint"`);
    await queryRunner.query(`ALTER TABLE "tripp" DROP COLUMN "careStartDate"`);
    await queryRunner.query(`ALTER TABLE "tripp" DROP COLUMN "careEndDate"`);
    await queryRunner.query(`ALTER TABLE "tripp" DROP COLUMN "hostId"`);
    await queryRunner.query(`ALTER TABLE "booking" DROP COLUMN "userId"`);
    await queryRunner.query(`ALTER TABLE "booking" DROP COLUMN "trippId"`);
    await queryRunner.query(`ALTER TABLE "follow" ADD "follower" uuid`);
    await queryRunner.query(`ALTER TABLE "follow" ADD "followed" uuid`);
    await queryRunner.query(`ALTER TABLE "blocked" ADD "blocked" uuid`);
    await queryRunner.query(`ALTER TABLE "blocked" ADD "blocker" uuid`);
    await queryRunner.query(
      `ALTER TABLE "tripp" ADD "meeting_point" point NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "tripp" ADD "care_start_date" TIMESTAMP WITH TIME ZONE NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "tripp" ADD "care_end_date" TIMESTAMP WITH TIME ZONE NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "tripp" ADD "host" uuid`);
    await queryRunner.query(`ALTER TABLE "booking" ADD "user" uuid`);
    await queryRunner.query(`ALTER TABLE "booking" ADD "tripp" uuid`);
    await queryRunner.query(
      `ALTER TABLE "gallery" ADD CONSTRAINT "FK_e80e132756f2fd1e1083cb65522" FOREIGN KEY ("tripp") REFERENCES "tripp"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "schedule" ADD CONSTRAINT "FK_09138b09647988dc954f1f08849" FOREIGN KEY ("tripp") REFERENCES "tripp"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "follow" ADD CONSTRAINT "FK_903c67798aca5869c297418838b" FOREIGN KEY ("follower") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "follow" ADD CONSTRAINT "FK_9d5de999c4de1c98c6cc5f4fdae" FOREIGN KEY ("followed") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "blocked" ADD CONSTRAINT "FK_f48ec9a1e27f578389af20a735e" FOREIGN KEY ("blocked") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "blocked" ADD CONSTRAINT "FK_57294906d66f3c60acf7ce1193a" FOREIGN KEY ("blocker") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "city" ADD CONSTRAINT "FK_08af2eeb576770524fa05e26f39" FOREIGN KEY ("country_id") REFERENCES "country"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "profile" ADD CONSTRAINT "FK_572de9e96808fe66e9fa73d23fc" FOREIGN KEY ("city") REFERENCES "city"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "tripp" ADD CONSTRAINT "FK_969a6d939707df2bfed88b64cad" FOREIGN KEY ("host") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "booking" ADD CONSTRAINT "FK_b3a629fbe6abb102b2f1a3d86fb" FOREIGN KEY ("user") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "booking" ADD CONSTRAINT "FK_de8772edae117d01549b44e20c7" FOREIGN KEY ("tripp") REFERENCES "tripp"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "booking" DROP CONSTRAINT "FK_de8772edae117d01549b44e20c7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "booking" DROP CONSTRAINT "FK_b3a629fbe6abb102b2f1a3d86fb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tripp" DROP CONSTRAINT "FK_969a6d939707df2bfed88b64cad"`,
    );
    await queryRunner.query(
      `ALTER TABLE "profile" DROP CONSTRAINT "FK_572de9e96808fe66e9fa73d23fc"`,
    );
    await queryRunner.query(
      `ALTER TABLE "city" DROP CONSTRAINT "FK_08af2eeb576770524fa05e26f39"`,
    );
    await queryRunner.query(
      `ALTER TABLE "blocked" DROP CONSTRAINT "FK_57294906d66f3c60acf7ce1193a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "blocked" DROP CONSTRAINT "FK_f48ec9a1e27f578389af20a735e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "follow" DROP CONSTRAINT "FK_9d5de999c4de1c98c6cc5f4fdae"`,
    );
    await queryRunner.query(
      `ALTER TABLE "follow" DROP CONSTRAINT "FK_903c67798aca5869c297418838b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "schedule" DROP CONSTRAINT "FK_09138b09647988dc954f1f08849"`,
    );
    await queryRunner.query(
      `ALTER TABLE "gallery" DROP CONSTRAINT "FK_e80e132756f2fd1e1083cb65522"`,
    );
    await queryRunner.query(`ALTER TABLE "booking" DROP COLUMN "tripp"`);
    await queryRunner.query(`ALTER TABLE "booking" DROP COLUMN "user"`);
    await queryRunner.query(`ALTER TABLE "tripp" DROP COLUMN "host"`);
    await queryRunner.query(`ALTER TABLE "tripp" DROP COLUMN "care_end_date"`);
    await queryRunner.query(
      `ALTER TABLE "tripp" DROP COLUMN "care_start_date"`,
    );
    await queryRunner.query(`ALTER TABLE "tripp" DROP COLUMN "meeting_point"`);
    await queryRunner.query(`ALTER TABLE "blocked" DROP COLUMN "blocker"`);
    await queryRunner.query(`ALTER TABLE "blocked" DROP COLUMN "blocked"`);
    await queryRunner.query(`ALTER TABLE "follow" DROP COLUMN "followed"`);
    await queryRunner.query(`ALTER TABLE "follow" DROP COLUMN "follower"`);
    await queryRunner.query(`ALTER TABLE "booking" ADD "trippId" uuid`);
    await queryRunner.query(`ALTER TABLE "booking" ADD "userId" uuid`);
    await queryRunner.query(`ALTER TABLE "tripp" ADD "hostId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "tripp" ADD "careEndDate" TIMESTAMP WITH TIME ZONE NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "tripp" ADD "careStartDate" TIMESTAMP WITH TIME ZONE NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "tripp" ADD "meetingPoint" point NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "blocked" ADD "blockerId" uuid`);
    await queryRunner.query(`ALTER TABLE "blocked" ADD "blockedId" uuid`);
    await queryRunner.query(`ALTER TABLE "follow" ADD "followedId" uuid`);
    await queryRunner.query(`ALTER TABLE "follow" ADD "followerId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "profile" RENAME COLUMN "city" TO "cityId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "city" RENAME COLUMN "country_id" TO "countryId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "schedule" RENAME COLUMN "tripp" TO "trippId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "gallery" RENAME COLUMN "tripp" TO "trippId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "booking" ADD CONSTRAINT "FK_2c696e6e41f8cdd8b6f8b1d6517" FOREIGN KEY ("trippId") REFERENCES "tripp"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "booking" ADD CONSTRAINT "FK_336b3f4a235460dc93645fbf222" FOREIGN KEY ("userId") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "tripp" ADD CONSTRAINT "FK_76131ca5c3a4e0a952c195449bd" FOREIGN KEY ("hostId") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "profile" ADD CONSTRAINT "FK_350e025f4336b40a3c876ee9e33" FOREIGN KEY ("cityId") REFERENCES "city"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "city" ADD CONSTRAINT "FK_990b8a57ab901cb812e2b52fcf0" FOREIGN KEY ("countryId") REFERENCES "country"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "blocked" ADD CONSTRAINT "FK_68a0cdaec5cd36a82c12e12a623" FOREIGN KEY ("blockerId") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "blocked" ADD CONSTRAINT "FK_387464f4c4d253c8f2ee1412121" FOREIGN KEY ("blockedId") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "follow" ADD CONSTRAINT "FK_f4a9d59861c87ba252ead40d84d" FOREIGN KEY ("followedId") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "follow" ADD CONSTRAINT "FK_550dce89df9570f251b6af2665a" FOREIGN KEY ("followerId") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "schedule" ADD CONSTRAINT "FK_03f227c93edde8b957e0a6c7c07" FOREIGN KEY ("trippId") REFERENCES "tripp"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "gallery" ADD CONSTRAINT "FK_16ea92d3096eeb52e572b7c3d3a" FOREIGN KEY ("trippId") REFERENCES "tripp"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
