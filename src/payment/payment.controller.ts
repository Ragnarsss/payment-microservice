import { Controller, Headers } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { PaymentMSG } from 'src/common/constants';
import { CheckDto, ConfirmationDTO, PaymentDTO } from './dto/payment.dto';
import { PaymentService } from './payment.service';

@ApiTags('payment')
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @MessagePattern(PaymentMSG.TRANSACTIONS)
  async getTransactions() {
    return this.paymentService.getTransactions();
  }

  @MessagePattern(PaymentMSG.GET_TRANSACTION)
  async getTransaction(@Payload() payload: any) {
    const { order } = payload;
    return this.paymentService.getTransaction(order);
  }

  @MessagePattern(PaymentMSG.TRANSACTION)
  async createTransaction(@Payload() paymentInput: PaymentDTO) {
    return this.paymentService.pay(paymentInput);
  }

  @MessagePattern(PaymentMSG.CONFIRM_PAYMENT)
  async confirmTransaction(@Payload() confirmationDto: ConfirmationDTO) {
    return this.paymentService.confirmPayment(confirmationDto);
  }

  @MessagePattern(PaymentMSG.CHECK_TRANSACTION)
  async checkTransaction(@Headers('token_ws') checkDto: CheckDto) {
    return this.paymentService.checkTransaction(checkDto);
  }

  @MessagePattern(PaymentMSG.USER_TRANSACTIONS)
  async getUserTransactions(@Payload() payload: any) {
    const { user } = payload;
    return this.paymentService.getUserTransactions(user);
  }
}
