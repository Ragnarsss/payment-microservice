import { registerAs } from '@nestjs/config';

export default registerAs('config', () => ({
  database: {
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    dbName: process.env.DATABASE_NAME,
    port: parseInt(process.env.DATABASE_PORT, 10),
    host: process.env.DATABASE_HOST,
    connection: process.env.DATABASE_CONNECTION,
  },
  rabbitmq: {
    amqp_url: process.env.AMQP_URL,
  },
}));
