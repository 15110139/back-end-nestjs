import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Authority } from "./authority.entity";
import { Repository } from "typeorm";
const ObjectId = require('mongodb').ObjectId;


@Injectable()
export class AuthorityService {
    constructor(
        @InjectRepository(Authority)
        private authorityRepository: Repository<Authority>
    ) { }


    async createRoles(authority: Authority) {
        const newAuthority = new Authority()
        newAuthority.functionRoles = authority.functionRoles
        newAuthority.roles = authority.roles
        return await this.authorityRepository.save(newAuthority)
    }
    async addFunctionRoles(authorityId: string, functionRoles: string[]) {
        return this.authorityRepository.update({ _id: ObjectId(authorityId) }, { $push: { functionRoles: { $each: functionRoles } } })
    }

    async getListFunctionRolesByRoles(roles: string) {
        const arrayRoles = await this.authorityRepository.findOne({ roles: roles })
        return arrayRoles.functionRoles
    }
}