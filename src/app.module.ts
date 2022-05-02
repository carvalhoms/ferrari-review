import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { PrismaModule } from './prisma/prisma.module';
import * as typeOrmConfig from '../database/typeorm/typeorm';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), PrismaModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
