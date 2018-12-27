import { Module } from "@nestjs/common";
import { User } from "../modules/user/user.enity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RolesGuard } from "./roles.guard";
import { UserService } from "modules/user/user.service";

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [UserService, RolesGuard],
    exports: [UserService, RolesGuard]
})

export class RolesModule { }