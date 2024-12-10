import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { SendEmailDto } from './dto/send-email.dto';
import { fillTemplate } from './templates/email';

@Injectable()
export class MailingProvider {
  //cambiar a variables de entorno
  transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: 'maddison53@ethereal.email',
      pass: 'jn7jnAPss4f63QBp6D',
    },
  });
  async sendMail(emailDetails: SendEmailDto) {
    try {
      // send mail with defined transport object
      const info = await this.transporter.sendMail({
        from: emailDetails.from, // sender address
        to: emailDetails.sendTo, // list of receivers
        subject: emailDetails.subject, // Subject line
        text: 'Hello world?', // plain text body
        html: fillTemplate(emailDetails), // html body
      });

      console.log('Message sent: %s', info.messageId);
      // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
    } catch (error) {
      throw new Error(error);
    }
  }
}
