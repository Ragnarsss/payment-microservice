import { Controller, Get, Headers, Post } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { PaymentMSG } from 'src/common/constants';
import { CheckDto, ConfirmationDTO, PaymentDTO } from './dto/payment.dto';
import { PaymentService } from './payment.service';

@ApiTags('payment')
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Get('transactions')
  async getTransactions() {
    return this.paymentService.getTransactions();
  }

  // @MessagePattern(PaymentMSG.TRANSACTION)
  @Post('transaction')
  async createTransaction(@Payload() paymentInput: PaymentDTO) {
    return this.paymentService.pay(paymentInput);
  }

  @Post('confirm')
  @MessagePattern(PaymentMSG.CONFIRM_PAYMENT)
  async confirmTransaction(@Payload() confirmationDto: ConfirmationDTO) {
    return this.paymentService.confirmPayment(confirmationDto);
  }

  @Get('check')
  @MessagePattern(PaymentMSG.CHECK_TRANSACTION)
  async checkTransaction(@Headers('token_ws') checkDto: CheckDto) {
    return this.paymentService.checkTransaction(checkDto);
  }
}
