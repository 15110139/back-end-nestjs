import { Resolver, Mutation, Args, Query } from "@nestjs/graphql";
import { AuthorityService } from "./authority.service";
import { Authority } from "./authority.entity";
import { LoggingInterceptor } from "interceptors/logging.interceptor";
import { UseInterceptors } from "@nestjs/common";

@Resolver('Authority')
@UseInterceptors(LoggingInterceptor)
export class AuthorityResolvers {
    constructor(
        private authorityService: AuthorityService
    ) { }


    @Query('getListFunctionRolesByRoles')
    async getListFunctionRolesByRoles(@Args('roles') roles: string): Promise<String[]> {
        return await this.getListFunctionRolesByRoles(roles)
    }

    @Mutation('createRoles')
    async createRoles(@Args('createRolesInput') createRolesInput: Authority): Promise<Authority> {
        try {
            return await this.authorityService.createRoles(createRolesInput)
        } catch (error) {
            console.log(error)
            throw new Error(error)
        }
    }

}