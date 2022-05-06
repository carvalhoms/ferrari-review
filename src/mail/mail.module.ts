import { MailService } from './mail.service';
import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: async () => ({
        transport: {
          host: process.env.MAIL_HOST,
          port: Number(process.env.MAIL_PORT),
          secure: Boolean(process.env.MAIL_SECURE),
          auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
          },
        },
        defaults: {
          from: `Ferrari review <${process.env.MAIL_FROM}>`,
        },
      }),
    }),
  ],
  controllers: [],
  providers: [MailService],
})
export class MailModule {}
