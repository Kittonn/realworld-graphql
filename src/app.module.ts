
import { Module } from '@nestjs/common';


import { EnvModule } from './modules';

@Module({
  imports: [
    // GraphQLModule.forRoot<ApolloDriverConfig>({
    //   driver: ApolloDriver,
    //   playground: false,
    //   typePaths: ['./**/*.graphql'],
    //   definitions: {
    //     path: join(process.cwd(), 'src/graphql.ts'),
    //     outputAs: 'class',
    //   },
    //   plugins: [ApolloServerPluginLandingPageLocalDefault()],
    // }),
    EnvModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
