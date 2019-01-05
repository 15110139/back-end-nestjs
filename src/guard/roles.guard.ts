
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UserService } from '../modules/user/user.service';
import { AuthorityService } from '../modules/authority/authority.service';
// import { ConfigService } from 'config/config.service';
const jwt = require('jsonwebtoken')

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly userService: UserService, private readonly authorityService: AuthorityService) { }
    async canActivate(
        context: ExecutionContext,
    ): Promise<boolean> {
        try {
            const ctxGgl = GqlExecutionContext.create(context);
            console.log(ctxGgl.getContext().reqId)
            // console.log(ctxGgl.getContext().headers['access-token'])
            const token = ctxGgl.getContext().headers['access-token'] ? ctxGgl.getContext().headers['access-token'] : null
            if (!token) {
                throw ('Token null')
            }
            const verifyJWT = new Promise((resolve, reject) =>
                jwt.verify(token, process.env.SECRET_KEY, (err: any, decoded: any) => {
                    if (err) {
                        if (err || !decoded) reject(err.message)
                    }
                    resolve(decoded)
                })
            )
            const infoUser: any = await verifyJWT
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
            console.error(error)
            throw new Error(error)
        }
    }
}