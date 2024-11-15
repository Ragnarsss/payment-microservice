import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import {
  Environment,
  IntegrationApiKeys,
  IntegrationCommerceCodes,
  Options,
  WebpayPlus,
} from 'transbank-sdk';
import { CheckDto, ConfirmationDTO, PaymentDTO } from './dto/payment.dto';

@Injectable()
export class PaymentService {
  private txOptions: Options;
  constructor() {
    this.txOptions = new Options(
      IntegrationCommerceCodes.WEBPAY_PLUS,
      IntegrationApiKeys.WEBPAY,
      Environment.Integration,
    );
  }
  async pay({ amount }: PaymentDTO): Promise<string> {
    const buyOrder = 'O-' + Math.floor(Math.random() * 1000);
    const sessionId = 'S-' + Math.floor(Math.random() * 100);
    const return_url = 'http://localhost:3001/confirmT';
    const tx = new WebpayPlus.Transaction(this.txOptions);
    console.log(tx);
    try {
      const response = await tx.create(buyOrder, sessionId, amount, return_url);
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
      throw new RpcException(error.message);
    }
  }

  async confirmPayment({ token }: ConfirmationDTO): Promise<string> {
    try {
      const tx = new WebpayPlus.Transaction(this.txOptions);
      const response = await tx.commit(token);
      console.log(response);
      return response;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  async checkTransaction({ token }: CheckDto): Promise<string> {
    try {
      const tx = new WebpayPlus.Transaction(this.txOptions);
      const response = await tx.status(token);
      console.log(response);
      return response;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }
}
