import { TableColumnOptions } from 'typeorm';

export const columnCreatedAt = {
  name: 'createdAt',
  type: 'timestamp',
  default: 'CURRENT_TIMESTAMP',
} as TableColumnOptions;
