import { Injectable, NestInterceptor, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { GqlExecutionContext } from '@nestjs/graphql';
import Logger from '../unitl/class.logger'
const logger = new Logger('test')
// const { createLogger, format, transports } = require('winston');
// const fs = require('fs');
// require('winston-daily-rotate-file');
// const logDir = 'log';
// const config = {
//     levels: {
//         error: 0,
//         debug: 1,
//         warn: 2,
//         data: 3,
//         info: 4,
//     },
//     colors: {
//         error: 'red',
//         debug: 'blue',
//         warn: 'yellow',
//         data: 'grey',
//         info: 'green',
//     }
// };


// // Create the log directory if it does not exist
// if (!fs.existsSync(logDir)) {
//     console.log('co nek')
//     fs.mkdirSync(logDir);
// }

// const dailyRotateFileTransport = new transports.DailyRotateFile({
//     filename: `${logDir}/%DATE%-results.log`,
//     datePattern: 'YYYY-MM-DD'
// });


// const logger = createLogger({
//     // change level if in dev environment versus production
//     levels: config.levels,
//     format: format.combine(
//         format.timestamp({
//             format: 'YYYY-MM-DD HH:mm:ss'
//         }),
//         format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
//     ),
//     transports: [
//         new transports.Console({
//             levels: config.levels,
//             format: format.combine(
//                 format.colorize(),
//                 format.printf(
//                     info => `${info.timestamp} ${info.level}: ${info.message}`
//                 )
//             )
//         }),
//         dailyRotateFileTransport
//     ]
// });


@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    intercept(
        context: ExecutionContext,
        call$: Observable<any>,
    ): Observable<any> {
        console.log('Before...');
        const ctxGgl = GqlExecutionContext.create(context);
        // console.log(ctxGgl.getContext())
        // console.log(ctxGgl.getContext().method)
        // console.log(ctxGgl.getContext().headers['access-token'])
        // console.log(ctxGgl.getContext().headers['referer'])
        // console.log(ctxGgl.getArgs())
        // console.log(JSON.stringify(Object['values'](ctxGgl.getArgs())[0]))
        // const filename = path.join(__dirname, 'created-logfile.log');
        // console.log('filename', filename)
        // const logger = winston.createLogger({
        //     transports: [
        //         new winston.transports.Console(),
        //         new winston.transports.File({ filename })
        //     ]
        // });
        const token = ctxGgl.getContext().headers['access-token'] ? ctxGgl.getContext().headers['access-token'] : null
        // logger.debug('Debugging info');
        // logger.verbose('Verbose info');
        logger.logger.warn('hihi')
        // logger.warn(`${ctxGgl.getContext().method} ${ctxGgl.getContext().headers['referer']} ${token} ${JSON.stringify(ctxGgl.getArgs())}`);
        // logger.info(`${ctxGgl.getContext().method} ${ctxGgl.getContext().headers['referer']} ${token} ${JSON.stringify(ctxGgl.getArgs())}`);
        // logger.debug(`${ctxGgl.getContext().method} ${ctxGgl.getContext().headers['referer']} ${token} ${JSON.stringify(ctxGgl.getArgs())}`);
        // logger.data(`${ctxGgl.getContext().method} ${ctxGgl.getContext().headers['referer']} ${token} ${JSON.stringify(ctxGgl.getArgs())}`);
        // logger.warn('Warning message');
        // logger.error('Error info');
        const now = Date.now();
        return call$.pipe(
            tap(() => console.log(`After... ${Date.now() - now}ms`)),
        );
    }
}