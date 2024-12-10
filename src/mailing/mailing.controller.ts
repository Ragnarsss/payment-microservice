import { Controller, HttpStatus, Res } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MailingService } from './mailing.service';
import { SendEmailDto } from './dto/send-email.dto';

@Controller('mailing')
export class MailingController {
  constructor(private readonly mailService: MailingService) {}

  @MessagePattern('send_mail')
  sendMail(@Payload() body: SendEmailDto) {
    try {
      const response = this.mailService.sendMail(body);
      return {
        status: HttpStatus.OK,
        data: response,
      };
    } catch (error) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.message,
      };
    }
  }
}
