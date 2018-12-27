import { Injectable } from "@nestjs/common";
import { Authority } from "./authority.entity";
import { getMongoRepository } from "typeorm";
import { InjectEntityManager, InjectRepository } from "@nestjs/typeorm";
const ObjectId = require('mongodb').ObjectId;


@Injectable()
export class AuthorityService {

    constructor(
        @InjectRepository(Authority)
        private authorityRepository = getMongoRepository(Authority)
    ) {

    }

    async createRoles(authority: Authority) {
        const newAuthority = new Authority()
        newAuthority.functionRoles = authority.functionRoles
        newAuthority.roles = authority.roles
        return await this.authorityRepository.save(newAuthority)
    }
    async addFunctionRoles(authorityId: string, functionRoles: string[]) {
        return this.authorityRepository.findOneAndUpdate({ _id: ObjectId(authorityId) }, { $push: { functionRoles: { $each: functionRoles } } })
    }

    async getListFunctionRolesByRoles(roles: string) {
        const arrayRoles = await this.authorityRepository.findOne({ roles: roles })
        return arrayRoles.functionRoles
    }
}