import { TableColumnOptions } from 'typeorm';

export const columnUpdatedAt = {
  name: 'updatedAt',
  type: 'timestamp',
  default: 'CURRENT_TIMESTAMP',
} as TableColumnOptions;
