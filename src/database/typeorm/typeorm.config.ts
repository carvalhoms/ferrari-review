import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'ferrari_review',
  synchronize: true,
  logging: true,
  entities: ['/entity/{.ts,.js}'],
  migrations: ['/migrations/*{.ts,.js}'],
  subscribers: ['/subscribers/*{.ts,.js}'],
  cli: {
    entitiesDir: '/entities',
    migrationsDir: '/migrations',
    subscribersDir: '/subscribers',
  },
};
