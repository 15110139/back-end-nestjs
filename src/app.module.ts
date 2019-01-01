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
import { ConfigModule } from './config.module';
// import { ConfigModule } from 'config.module';

@Module({
  imports: [
    ConfigModule,
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
        return req
      },
      playground: {
        settings: {
          "editor.fontFamily": "'Source Code Pro', 'Consolas', 'Inconsolata', 'Droid Sans Mono', 'Monaco', monospace",
          "editor.cursorShape": "line",
          "editor.theme": "dark",
        }
      },
      formatError: error => {
        // console.log(error)
        return error.message
      }
    }),

  ],
})
export class AppModule { }
