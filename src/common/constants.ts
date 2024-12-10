export enum RabbitMQ {
  PaymentQueue = 'payment_queue',
  UserQueue = 'user_queue',
}

export enum PaymentMSG {
  TRANSACTION = 'TRANSACTION',
  GET_TRANSACTION = 'GET_TRANSACTION',
  TRANSACTIONS = 'TRANSACTIONS',
  CONFIRM_PAYMENT = 'CONFIRM_PAYMENT',
  CHECK_TRANSACTION = 'CHECK_TRANSACTION',
  USER_TRANSACTIONS = 'USER_TRANSACTIONS',
}

export enum UserMSG {
  FIND_ONE_BY_ID = 'FIND_ONE_BY_ID',
}
