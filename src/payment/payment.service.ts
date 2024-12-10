import { Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import {
  Environment,
  IntegrationApiKeys,
  IntegrationCommerceCodes,
  Options,
  WebpayPlus,
} from 'transbank-sdk';
import { CheckDto, ConfirmationDTO, PaymentDTO } from './dto/payment.dto';
import { InjectModel } from '@nestjs/mongoose';
import {
  Transaction,
  TransactionDocument,
} from './entities/transaction.entity';
import { Model } from 'mongoose';
import { ClientProxyService } from 'src/common/proxy/client-proxy';
import { RabbitMQ, UserMSG } from 'src/common/constants';

@Injectable()
export class PaymentService {
  private txOptions: Options;
  private readonly userProxy: ClientProxy;
  constructor(
    @InjectModel(Transaction.name)
    private transactionModel: Model<TransactionDocument>,
    private readonly clientProxyService: ClientProxyService,
  ) {
    this.txOptions = new Options(
      IntegrationCommerceCodes.WEBPAY_PLUS,
      IntegrationApiKeys.WEBPAY,
      Environment.Integration,
    );
    this.userProxy = this.clientProxyService.getClientProxy(RabbitMQ.UserQueue);
  }
  async pay({ amount, buyer, items }: PaymentDTO): Promise<any> {
    const buyOrder = 'O-' + Math.floor(Math.random() * 1000);
    const sessionId = 'S-' + Math.floor(Math.random() * 100);
    const return_url = 'http://localhost:3001/confirmT';
    const tx = new WebpayPlus.Transaction(this.txOptions);
    try {
      const response = await tx.create(buyOrder, sessionId, amount, return_url);
      const transaction = new this.transactionModel({
        order: buyOrder,
        buyer,
        amount,
        items,
        status: 'CREATED',
      });
      const savedTransaction = await transaction.save();

      this.userProxy.send(UserMSG.UPDATE_TRANSACTIONS, {
        userId: buyer,
        buyOrder,
      });

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
}
