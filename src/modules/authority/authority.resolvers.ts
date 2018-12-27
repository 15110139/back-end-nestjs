import { Resolver, Mutation, Args, Query } from "@nestjs/graphql";
import { AuthorityService } from "./authority.service";
import { Authority } from "./authority.entity";

@Resolver('Authority')

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
        console.log('createRolesInput', createRolesInput)
        console.log('hee liu')
        return await this.authorityService.createRoles(createRolesInput)
    }

}