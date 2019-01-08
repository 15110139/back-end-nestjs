
import { Injectable, CanActivate, ExecutionContext, UseInterceptors } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UserService } from '../modules/user/user.service';
import { AuthorityService } from '../modules/authority/authority.service';
import { LoggingInterceptor } from 'interceptors/logging.interceptor';
import Logger from '../unitl/Logger';
// import { ConfigService } from 'config/config.service';
const jwt = require('jsonwebtoken')
const logger = new Logger('log')


@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly userService: UserService, private readonly authorityService: AuthorityService) { }
    async canActivate(
        context: ExecutionContext,
    ): Promise<boolean> {
        const env = process.env.NODE_ENV || 'production'
        const ctxGgl = GqlExecutionContext.create(context);
        const token = ctxGgl.getContext().headers['access-token'] ? ctxGgl.getContext().headers['access-token'] : null
        try {
            // console.log(ctxGgl.getContext().reqId)
            // console.log(ctxGgl.getContext().headers['access-token'])
            if (!token) {
                throw ('Token null')
            }
            const infoUser = await jwt.verify(token, process.env.SECRET_KEY)
            // console.log('userId', infoUser.userId)
            const user = await this.userService.getInfoUserById(infoUser.userId)
            if (!user) {
                throw ('User not found')
            }
            const arrayFunctionRoles: any = await this.authorityService.getListFunctionRolesByRoles(user.roles)
            const functionExc = ctxGgl.getInfo().fieldName
            if (!arrayFunctionRoles.includes(functionExc.toString())) {
                throw ('User not permission')
            }
            return true;
        } catch (error) {
            if (env == 'development') {
                logger.writeLog('error').error(`${ctxGgl.getContext().method} ${ctxGgl.getContext().headers['referer']} ${ctxGgl.getContext().reqId} ${token} ${JSON.stringify(ctxGgl.getArgs())} ${error} `);
            } else {
                console.log(error)
            }
            throw new Error(error)
        }
    }
}