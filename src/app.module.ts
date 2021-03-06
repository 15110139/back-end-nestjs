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

@Module({
  imports: [
    // ConfigModule,
    AuthorityModule,
    UserModule,
    MoviesModule,
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mongodb',
        host: process.env.NODE_ENV === 'production' ? process.env.DB_HOST_PRODUCTION : process.env.DB_HOST_DEVELOPMENT,
        port: process.env.NODE_ENV === 'production' ? Number(process.env.DB_PORT_PRODUCTION) : Number(process.env.DB_PORT_DEVELOPMENT),
        database: process.env.NODE_ENV === 'production' ? process.env.DB_NAME_PRODUCTION : process.env.DB_PORT_DEVELOPMENT,
        useNewUrlParser: true,
        entities: [
          Movie, User, Authority
        ],
        synchronize: true
      })
    }),
    GraphQLModule.forRootAsync({
      useFactory: () => ({
        typePaths: ['./**/*.graphql'],
        installSubscriptionHandlers: true,
        context: ({ req }) => {
          req.reqId = uuidv4()
          const token = req.headers['access-token'] ? req.headers['access-token'] : null
          if (process.env.NODE_ENV === 'development') {
            logger.writeLog('info').info(`${req.headers.referer} ${req.reqId} ${token} ${JSON.stringify(req.body.variables)} ${JSON.stringify(req.body.query)}`)
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
          return error
        }
      })
    }),

  ],
})
export class AppModule { }
