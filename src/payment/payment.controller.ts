import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Headers } from '@nestjs/common';
import {
  Environment,
  IntegrationApiKeys,
  IntegrationCommerceCodes,
  WebpayPlus,
  Options,
} from 'transbank-sdk';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PaymentMSG } from 'src/common/constants';

@ApiTags('payment')
@Controller('payment')
export class PaymentController {
  @MessagePattern(PaymentMSG.TRANSACTION)
  async createTransaction(@Payload() amount: number) {
    console.log(amount);
    const buyOrder = 'O-' + Math.floor(Math.random() * 1000);
    const sessionId = 'S-' + Math.floor(Math.random() * 100);
    const return_url = 'http://localhost:3001/confirmT';
    const tx = new WebpayPlus.Transaction(
      new Options(
        IntegrationCommerceCodes.WEBPAY_PLUS,
        IntegrationApiKeys.WEBPAY,
        Environment.Integration,
      ),
    );
    const response = await tx.create(buyOrder, sessionId, amount, return_url);
    console.log(response);
    return response;
  }

  @MessagePattern(PaymentMSG.CONFIRM_PAYMENT)
  async confirmTransaction(@Payload() token: string) {
    const tx = new WebpayPlus.Transaction(
      new Options(
        IntegrationCommerceCodes.WEBPAY_PLUS,
        IntegrationApiKeys.WEBPAY,
        Environment.Integration,
      ),
    );
    const response = await tx.commit(token);
    return response;
  }

  @Get('/status')
  async checkTransaction(@Headers('token_ws') token: string) {
    const tx = new WebpayPlus.Transaction(
      new Options(
        IntegrationCommerceCodes.WEBPAY_PLUS,
        IntegrationApiKeys.WEBPAY,
        Environment.Integration,
      ),
    );
    const response = await tx.status(token);
    return response;
  }
}
