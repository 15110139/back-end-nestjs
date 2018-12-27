import { Module } from "@nestjs/common";
import { User } from "../modules/user/user.enity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RolesGuard } from "./roles.guard";
import { UserService } from "../modules/user/user.service";
import { AuthorityService } from "../modules/authority/authority.service";
import { Authority } from "../modules/authority/authority.entity";

@Module({
    imports: [TypeOrmModule.forFeature([User,Authority])],
    providers: [UserService, RolesGuard, AuthorityService],
    exports: [UserService, RolesGuard, AuthorityService]
})

export class RolesModule { }