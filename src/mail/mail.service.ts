import { MailerService } from '@nestjs-modules/mailer';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private mailerSerice: MailerService) {}

  async send({
    to,
    subject,
    template,
    data,
  }: {
    to: string;
    subject: string;
    template: string;
    data: any;
  }) {
    try {
      return this.mailerSerice.sendMail({
        to,
        subject,
        template,
        context: data,
      });
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
