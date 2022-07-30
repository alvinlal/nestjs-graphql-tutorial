import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { PUB_SUB } from './pubsub.constants';

@Module({
  providers: [
    {
      provide: PUB_SUB,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        new RedisPubSub({
          connection: {
            host: configService.get('REDIS_HOST'),
            port: configService.get('REDIS_PORT'),
          },
        }),
    },
  ],
  exports: [PUB_SUB],
})
export class PubsubModule {}
