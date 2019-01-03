import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { MoviesModule } from './modules/movies/movies.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './modules/movies/movies.entity';
import { UserModule } from './modules/user/user.module';
import { User } from './modules/user/user.enity';
import { AuthorityModule } from './modules/authority/authority.module';
import { Authority } from './modules/authority/authority.entity';
// import { ConfigModule } from './config/config.module';

@Module({
  imports: [
    // ConfigModule,
    AuthorityModule,
    UserModule,
    MoviesModule,
    TypeOrmModule.forRoot({
      type: "mongodb",
      host: "localhost",
      port: 27017,
      database: "test",
      useNewUrlParser: true,
      entities: [
        Movie, User, Authority  
      ],
      synchronize: true
    }),
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      installSubscriptionHandlers: true,
      context: ({ req }) => {
        // console.log(req)
        return req
      },
      playground: {
        settings: {
          "editor.cursorShape": "line",
          "editor.theme": "dark",
        }
      },
      formatError: error => {

        // console.log(error)
        return error
      }
    }),

  ],
})
export class AppModule { }
