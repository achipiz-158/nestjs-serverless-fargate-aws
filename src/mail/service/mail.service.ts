import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendMailCodeVerify(
    email: string | string[],
    subject: string,
    code: number,
  ) {
    await this.mailerService.sendMail({
      to: email,
      subject,
      template: './code',
      context: {
        code,
      },
    });
  }
}
