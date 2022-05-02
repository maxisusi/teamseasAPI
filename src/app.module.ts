import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { DonationsModule } from './donations/donations.module';
import { ApolloDriver } from '@nestjs/apollo';
import { GraphQLDateTime } from 'graphql-iso-date';
@Module({
  imports: [
    GraphQLModule.forRoot({
      playground: false,
      // To get the plugin from apollo inseatd of the native
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      typePaths: ['./**/*.graphql'],
      resolvers: { DateTime: GraphQLDateTime },
      driver: ApolloDriver,
    }),
    DonationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
