import { MigrationInterface, QueryRunner } from 'typeorm';

export class SchemaSync1634309064436 implements MigrationInterface {
  name = 'SchemaSync1634309064436';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "coffee" ADD "description_new" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "coffee" DROP COLUMN "description_new"`,
    );
  }
}
