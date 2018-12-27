
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UserService } from 'modules/user/user.service';
import { AuthorityService } from 'modules/authority/authority.service';
const jwt = require('jsonwebtoken')

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly userService: UserService, private readonly authorityService: AuthorityService) { }

    async canActivate(
        context: ExecutionContext,
    ): Promise<boolean> {
        const ctx = context.getArgs()
        console.log(ctx[2].headers['access-token'])
        const token = ctx[2].headers['access-token']
        const decoded = jwt.verify(token, 'GO');
        console.log(decoded.userId)
        if (!decoded) {
            throw new Error('INVALID_TOKEN')
        }
        const user = await this.userService.getInfoUserById(decoded.userId)
        console.log("user", user)
        if (!user) {
            throw new Error('NOT_FOUND_USER')
        }
        const arrayFunctionRoles = await this.authorityService.getListFunctionRolesByRoles(user.roles)

        const ctx2 = GqlExecutionContext.create(context);
        console.log("222", ctx2.getInfo().fieldName)

        const functionExc = ctx2.getInfo().fieldName
        if (arrayFunctionRoles.findIndex(functionExc) == -1) {
            throw new Error('USER_NOT_PERMISSION')
        }
        return true;
    }
}