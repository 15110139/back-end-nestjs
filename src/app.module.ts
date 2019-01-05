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
const uuidv4 = require('uuid/v4');
import Logger from './unitl/Logger'
const logger = new Logger('logAll')
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
        // console.log('ENV',process.env.NODE_ENV)
        // console.log(req.headers)
        req.reqId = uuidv4()
        // console.log(req.body)
        const token = req.headers['access-token'] ? req.headers['access-token'] : null
        // logger.writeLog('info').info(`${req.headers.referer} ${req.reqId} ${token} ${JSON.stringify(req.body.variables)} ${JSON.stringify(req.body.query)}`)
        if (process.env.NODE_ENV === 'development') {
          // console.log(req)
        }
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
