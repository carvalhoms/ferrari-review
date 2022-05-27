import { TableColumnOptions } from 'typeorm';

export const columnVarchar = (length: string = '255') => {
  return {
    name: 'name',
    type: 'varchar',
    length,
  } as TableColumnOptions;
};
