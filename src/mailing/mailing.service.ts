import { Injectable } from '@nestjs/common';
import { MailingProvider } from './mailing';
import { SendEmailDto } from './dto/send-email.dto';
import { fillTemplate } from './templates/email';

@Injectable()
export class MailingService {
  constructor(private readonly mailingProvider: MailingProvider) {}
  async sendMail(emailDetails: SendEmailDto) {
    try {
      await this.mailingProvider.sendMail(emailDetails);
    } catch (error) {
      throw new Error(error);
    }
  }

  getTemplate(body) {
    const html = fillTemplate(body);
    return html;
  }
}
