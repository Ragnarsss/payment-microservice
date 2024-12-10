import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { SendEmailDto } from './dto/send-email.dto';

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
      const emailText = `Order: ${emailDetails.order} \n Amount: ${emailDetails.amount} \n Items: ${emailDetails.items}`;

      // send mail with defined transport object
      await this.transporter.sendMail({
        from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
        to: emailDetails.sendTo, // list of receivers
        subject: emailDetails.subject, // Subject line
        text: emailText, // plain text body
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}
