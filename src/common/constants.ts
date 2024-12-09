export enum RabbitMQ {
  PaymentQueue = 'payment_queue',
}

export enum PaymentMSG {
  TRANSACTION = 'TRANSACTION',
  TRANSACTIONS = 'TRANSACTIONS',
  CONFIRM_PAYMENT = 'CONFIRM_PAYMENT',
  CHECK_TRANSACTION = 'CHECK_TRANSACTION',
}
