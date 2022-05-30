import { TimeOptionsModule } from './time-option/time-options.module';
import { ContactModule } from './contact/contact.module';
import { MailModule } from './mail/mail.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ServicesModule } from './services/services.module';
import * as typeOrmConfig from '../database/typeorm/typeorm';

@Module({
  imports: [
    TimeOptionsModule,
    ContactModule,
    MailModule,
    TypeOrmModule.forRoot(typeOrmConfig),
    PrismaModule,
    UserModule,
    AuthModule,
    ServicesModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
