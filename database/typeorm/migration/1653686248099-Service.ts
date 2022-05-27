import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { columnId, columnCreatedAt, columnUpdatedAt } from '../collumns';

export class Service1653686248099 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'services',
        columns: [columnId, columnCreatedAt, columnUpdatedAt],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
