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
  entities: [__dirname + '/entity/*{.js,.ts}'],
  migrations: [__dirname + '/migration/*{.js,.ts}'],
  subscribers: [__dirname + '/subscriber/*{.js,.ts}'],
  cli: {
    entitiesDir: './entity',
    migrationsDir: './migration',
    subscribersDir: './subscriber',
  },
};

module.exports = options;
