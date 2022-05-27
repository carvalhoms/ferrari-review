import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import {
  columnId,
  columnCreatedAt,
  columnUpdatedAt,
  columnVarchar,
} from '../collumns';

export class Service1653686248099 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'services',
        columns: [
          columnId,
          columnVarchar('45'),
          {
            name: 'description',
            type: 'mediumtext',
          },
          {
            name: 'price',
            type: 'decimal',
            precision: 10,
            scale: 2,
          },
          columnCreatedAt,
          columnUpdatedAt,
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('services');
  }
}
