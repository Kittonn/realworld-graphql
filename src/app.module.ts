import { join } from 'path';

import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { HttpException, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';

import { AuthModule, EnvModule, PrismaModule, UsersModule } from './modules';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: false,
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
        outputAs: 'class',
      },
      formatError: error => {
        const originalError = error.extensions?.originalError as HttpException;

        console.log(originalError);

        if (!originalError) {
          return {
            message: error.message,
            code: error.extensions?.code,
          };
        }

        return {
          message: originalError.message,
          code: error.extensions?.code,
        };
      },
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    EnvModule,
    PrismaModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
