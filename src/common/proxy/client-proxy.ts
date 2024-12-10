import { Inject, Injectable, OnModuleDestroy } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import config from 'src/config';
import { RabbitMQ } from '../constants';

@Injectable()
export class ClientProxyService implements OnModuleDestroy {
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
          urls: [this.configService.rabbitmq.amqp_url],
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
}
