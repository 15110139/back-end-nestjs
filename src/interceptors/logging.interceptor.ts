import { Injectable, NestInterceptor, ExecutionContext } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import { GqlExecutionContext } from '@nestjs/graphql';
import Logger from '../unitl/Logger'
const logger = new Logger('log')
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    intercept(
        context: ExecutionContext,
        call$: Observable<any>,
    ): Observable<any> {
        const env = process.env.NODE_ENV || 'production'
        console.log('Before...');
        const ctxGgl = GqlExecutionContext.create(context);
        // console.log(ctxGgl.getContext())
        // console.log(ctxGgl.getContext().method)
        // console.log(ctxGgl.getContext().headers['access-token'])
        // console.log(ctxGgl.getContext().headers['referer'])
        // console.log(ctxGgl.getArgs())
        // console.log(JSON.stringify(Object['values'](ctxGgl.getArgs())[0]))
        const token = ctxGgl.getContext().headers['access-token'] ? ctxGgl.getContext().headers['access-token'] : null

        if (env == 'developer') {
            logger.writeLog('info').info(`${ctxGgl.getContext().method} ${ctxGgl.getContext().headers['referer']} ${ctxGgl.getContext().reqId} ${token} ${JSON.stringify(ctxGgl.getArgs())}`);
        }
        // logger.info(`${ctxGgl.getContext().method} ${ctxGgl.getContext().headers['referer']} ${token} ${JSON.stringify(ctxGgl.getArgs())}`);
        // logger.debug(`${ctxGgl.getContext().method} ${ctxGgl.getContext().headers['referer']} ${token} ${JSON.stringify(ctxGgl.getArgs())}`);
        // logger.data(`${ctxGgl.getContext().method} ${ctxGgl.getContext().headers['referer']} ${token} ${JSON.stringify(ctxGgl.getArgs())}`);
        const now = Date.now();
        return call$.pipe(
            tap(() => console.log(`After... ${Date.now() - now}ms`)),
            catchError(err => {

                if (env == 'development') {
                    logger.writeLog('error').error(`${ctxGgl.getContext().method} ${ctxGgl.getContext().headers['referer']} ${ctxGgl.getContext().reqId} ${token} ${JSON.stringify(ctxGgl.getArgs())} ${err} `);

                } else {
                    console.log(err)
                }
                return throwError(err)
            })
        );
    }
}