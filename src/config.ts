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
    host: process.env.RABBITMQ_HOST,
    port: parseInt(process.env.RABBITMQ_PORT, 10),
    username: process.env.RABBITMQ_USERNAME,
    password: process.env.RABBITMQ_PASSWORD,
  },
}));
