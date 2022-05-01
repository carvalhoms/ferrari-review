import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const options: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'ferrari_review',
  synchronize: true,
  logging: true,
  entities: ['./src/database/typeorm/entities/**/*.ts'],
  migrations: ['./src/database//typeorm/migrations/**/*.ts'],
  subscribers: ['./src/database//typeorm/subscribers/**/*.ts'],
  cli: {
    entitiesDir: './src/database/typeorm/entities',
    migrationsDir: './src/database/typeorm/migrations',
    subscribersDir: './src/database/subscribers',
  },
};

module.exports = options;
