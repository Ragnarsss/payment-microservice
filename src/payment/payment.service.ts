import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Environment,
  IntegrationApiKeys,
  IntegrationCommerceCodes,
  Options,
  WebpayPlus,
} from 'transbank-sdk';
import { CheckDto, ConfirmationDTO, PaymentDTO } from './dto/payment.dto';
import {
  Transaction,
  TransactionDocument,
} from './entities/transaction.entity';
import { MailingService } from 'src/mailing/mailing.service';
import { SendEmailDto } from 'src/mailing/dto/send-email.dto';

@Injectable()
export class PaymentService {
  private txOptions: Options;
  constructor(
    @InjectModel(Transaction.name)
    private transactionModel: Model<TransactionDocument>,
    private readonly mailingService: MailingService,
  ) {
    this.txOptions = new Options(
      IntegrationCommerceCodes.WEBPAY_PLUS,
      IntegrationApiKeys.WEBPAY,
      Environment.Integration,
    );
  }
  async pay({ amount, buyer, items }: PaymentDTO): Promise<any> {
    const buyOrder = 'O-' + Math.floor(Math.random() * 1000);
    const sessionId = 'S-' + Math.floor(Math.random() * 100);
    const return_url = 'http://localhost:3001/confirmT';
    const tx = new WebpayPlus.Transaction(this.txOptions);
    try {
      await tx.create(buyOrder, sessionId, amount, return_url);
      const transaction = new this.transactionModel({
        order: buyOrder,
        buyer,
        amount,
        items,
        status: 'CREATED',
      });

      const savedTransaction = await transaction.save();

      // const emailDetails: SendEmailDto = {
      //   sendTo: 'email',
      //   subject: 'Payment Confirmation',
      //   from: '[email protected]',
      //   template: 'paymentConfirmation',
      //   order: buyOrder,
      //   amount: amount,
      //   items: items,
      // };
      // await this.mailingService.sendMail(emailDetails);

      return savedTransaction;
    } catch (error) {
      console.log(error);
      throw new RpcException(error.message);
    }
  }

  async confirmPayment({ token }: ConfirmationDTO): Promise<string> {
    try {
      const tx = new WebpayPlus.Transaction(this.txOptions);
      const response = await tx.commit(token);
      return response;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  async checkTransaction({ token }: CheckDto): Promise<string> {
    try {
      const tx = new WebpayPlus.Transaction(this.txOptions);
      const response = await tx.status(token);
      return response;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  async getTransactions(): Promise<any[]> {
    return await this.transactionModel.find().lean().exec();
  }

  async getTransaction(order: string): Promise<any> {
    try {
      const transaction = await this.transactionModel
        .findOne({ order })
        .lean()
        .exec();
      if (!transaction) {
        throw new RpcException('Transaction not found');
      }
      return transaction;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  async getUserTransactions(user: string): Promise<any[]> {
    return await this.transactionModel.find({ buyer: user }).lean().exec();
  }
}
