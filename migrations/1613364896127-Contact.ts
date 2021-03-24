import { MigrationInterface, QueryRunner } from 'typeorm'

export class Contact1613364896127 implements MigrationInterface {
    name = 'Contact1613364896127'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "public"."contact" DROP CONSTRAINT "FK_cd3a8377078f09d66e87169a3e4"')
        await queryRunner.query('ALTER TABLE "public"."user" DROP COLUMN "name"')
        await queryRunner.query('ALTER TABLE "public"."user" ADD "name" character varying NOT NULL')
        await queryRunner.query('ALTER TABLE "public"."user" DROP COLUMN "email"')
        await queryRunner.query('ALTER TABLE "public"."user" ADD "email" character varying NOT NULL')
        await queryRunner.query('ALTER TABLE "public"."user" DROP COLUMN "password"')
        await queryRunner.query('ALTER TABLE "public"."user" ADD "password" character varying NOT NULL')
        await queryRunner.query('ALTER TABLE "public"."contact" DROP COLUMN "name"')
        await queryRunner.query('ALTER TABLE "public"."contact" ADD "name" character varying NOT NULL')
        await queryRunner.query('ALTER TABLE "public"."contact" DROP COLUMN "email"')
        await queryRunner.query('ALTER TABLE "public"."contact" ADD "email" character varying NOT NULL')
        await queryRunner.query('ALTER TABLE "public"."contact" ADD CONSTRAINT "FK_cd3a8377078f09d66e87169a3e4" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION')
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "public"."contact" DROP CONSTRAINT "FK_cd3a8377078f09d66e87169a3e4"')
        await queryRunner.query('ALTER TABLE "public"."contact" DROP COLUMN "email"')
        await queryRunner.query('ALTER TABLE "public"."contact" ADD "email" text NOT NULL')
        await queryRunner.query('ALTER TABLE "public"."contact" DROP COLUMN "name"')
        await queryRunner.query('ALTER TABLE "public"."contact" ADD "name" text NOT NULL')
        await queryRunner.query('ALTER TABLE "public"."user" DROP COLUMN "password"')
        await queryRunner.query('ALTER TABLE "public"."user" ADD "password" text NOT NULL')
        await queryRunner.query('ALTER TABLE "public"."user" DROP COLUMN "email"')
        await queryRunner.query('ALTER TABLE "public"."user" ADD "email" text NOT NULL')
        await queryRunner.query('ALTER TABLE "public"."user" DROP COLUMN "name"')
        await queryRunner.query('ALTER TABLE "public"."user" ADD "name" text NOT NULL')
        await queryRunner.query('ALTER TABLE "public"."contact" ADD CONSTRAINT "FK_cd3a8377078f09d66e87169a3e4" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE NO ACTION')
    }

}
