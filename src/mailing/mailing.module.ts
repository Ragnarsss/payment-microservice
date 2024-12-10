import { Module } from '@nestjs/common';
import { MailingController } from './mailing.controller';
import { MailingService } from './mailing.service';
import { MailingProvider } from './mailing';

@Module({
  controllers: [MailingController],
  providers: [MailingService, MailingProvider],
  exports: [MailingService],
})
export class MailingModule {}
