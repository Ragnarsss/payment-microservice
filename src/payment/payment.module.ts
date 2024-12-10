import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Transaction, TransactionSchema } from './entities/transaction.entity';
import { MailingModule } from 'src/mailing/mailing.module';
import { ClientProxyService } from 'src/common/proxy/client-proxy';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Transaction.name,
        schema: TransactionSchema,
      },
    ]),
    MailingModule,
  ],
  controllers: [PaymentController],
  providers: [PaymentService, ClientProxyService],
})
export class PaymentModule {}
