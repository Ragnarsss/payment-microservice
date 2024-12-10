import {
  Inject,
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import config from 'src/config';
import { RabbitMQ } from '../constants';

@Injectable()
export class ClientProxyService implements OnModuleDestroy, OnModuleInit {
  private logger: Logger = new Logger(ClientProxyService.name);
  private readonly clientProxies: Map<string, ClientProxy> = new Map();

  constructor(
    @Inject(config.KEY)
    private readonly configService: ConfigType<typeof config>,
  ) {}

  getClientProxy(queueName: RabbitMQ): ClientProxy {
    if (!this.clientProxies.has(queueName)) {
      const proxy = ClientProxyFactory.create({
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://user:password@rabbitmq_integrador:5672'],
          queue: queueName,
        },
      });
      this.clientProxies.set(queueName, proxy);
    }
    return this.clientProxies.get(queueName);
  }

  // Limpieza de conexiones cuando el módulo se destruye
  async onModuleDestroy() {
    for (const proxy of this.clientProxies.values()) {
      await proxy.close();
    }
  }

  async onModuleInit() {
    this.logger.log('ClientProxyService initialized');
  }
}
