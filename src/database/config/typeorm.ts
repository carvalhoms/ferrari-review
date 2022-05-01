import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const options: TypeOrmModuleOptions = {
  type: process.env.DB_TYPE as any,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: Boolean(process.env.DB_SYNCHRONIZE),
  logging: Boolean(process.env.DB_LOGGING),
  entities: [process.env.DB_ENTITIES],
  migrations: [process.env.DB_MIGRATIONS],
  subscribers: [process.env.DB_SUBSCRIBERS],
  cli: {
    entitiesDir: process.env.DB_ENTITIES_DIR,
    migrationsDir: process.env.DB_MIGRATIONS_DIR,
    subscribersDir: process.env.DB_SUBSCRIBERS_DIR,
  },
};

module.exports = options;
