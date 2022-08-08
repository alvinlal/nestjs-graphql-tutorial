import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { PetsModule } from './pets/pets.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OwnersModule } from './owners/owners.module';
import { UtilsModule } from './utils/utils.module';
import { PubsubModule } from './pubsub/pubsub.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ComplexityPlugin } from './plugins/ComplexityPlugin';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: false,
      migrationsRun: process.env.NODE_ENV == 'test',
      migrations: ['dist/src/database/migrations/*.js'],
      logging: process.env.NODE_ENV == 'development',
      dropSchema: process.env.NODE_ENV == 'test',
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      cors: {
        origin: true,
        credentials: true,
      },
      context: ({ req, res }) => ({ req, res }),
      driver: ApolloDriver,
      subscriptions: {
        'graphql-ws': true,
      },
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: false,
      plugins: [
        ApolloServerPluginLandingPageLocalDefault(),
        new ComplexityPlugin(20),
      ],
    }),
    PetsModule,
    OwnersModule,
    UtilsModule,
    PubsubModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
