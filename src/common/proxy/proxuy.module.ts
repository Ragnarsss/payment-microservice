import { Module } from '@nestjs/common';
import { ClientProxyService } from './client-proxy';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [ClientProxyService],
  exports: [ClientProxyService],
})
export class ProxyModule {}
