import { Global, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import config from 'src/config';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        const { connection, user, password, host, port, dbName } =
          configService.database;
        return {
          uri: `${connection}://${user}:${password}@${host}:${port}/${dbName}?authSource=admin`,
          user,
          pass: password,
          dbName,
        };
      },
    }),
  ],
  exports: [MongooseModule],
})
export class DatabaseModule {}
