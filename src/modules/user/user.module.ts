import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user.enity";
import { UserService } from "./user.service";
import { UserResolvers } from "./user.resolvers";
import { RolesModule } from "../../guard/roles.module";

@Module({
    imports: [TypeOrmModule.forFeature([User]), RolesModule],
    providers: [UserService, UserResolvers]
})

export class UserModule { }