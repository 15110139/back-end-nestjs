import { Injectable, NestInterceptor, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { GqlExecutionContext } from '@nestjs/graphql';
import Logger from '../unitl/Logger'
const logger = new Logger('info-af')




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
        const token = ctxGgl.getContext().headers['access-token'] ? ctxGgl.getContext().headers['access-token'] : null
        // logger.writeLog('tien').warn('2324234')
        // logger.warn(`${ctxGgl.getContext().method} ${ctxGgl.getContext().headers['referer']} ${ctxGgl.getContext().reqId} ${token} ${JSON.stringify(ctxGgl.getArgs())}`);
        // logger.info(`${ctxGgl.getContext().method} ${ctxGgl.getContext().headers['referer']} ${token} ${JSON.stringify(ctxGgl.getArgs())}`);
        // logger.debug(`${ctxGgl.getContext().method} ${ctxGgl.getContext().headers['referer']} ${token} ${JSON.stringify(ctxGgl.getArgs())}`);
        // logger.data(`${ctxGgl.getContext().method} ${ctxGgl.getContext().headers['referer']} ${token} ${JSON.stringify(ctxGgl.getArgs())}`);
        const now = Date.now();
        return call$.pipe(
            tap(() => console.log(`After... ${Date.now() - now}ms`)),
        );
    }
}