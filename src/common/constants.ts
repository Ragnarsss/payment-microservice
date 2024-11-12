export enum RabbitMQ {
  PaymentQueue = 'payment',
}

export enum PaymentMSG {
  TRANSACTION = 'TRANSACTION',
  CONFIRM_PAYMENT = 'CONFIRM_PAYMENT',
  CHECK_TRANSACTION = 'CHECK_TRANSACTION',
}
