import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class addImagetoRecipe1708345002308 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'recipe',
      new TableColumn({
        name: 'image',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('recipe', 'image');
  }
}
