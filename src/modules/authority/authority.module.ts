import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Authority } from "./authority.entity";
import { AuthorityService } from "./authority.service";
import { AuthorityResolvers } from "./authority.resolvers";

@Module({
    imports: [TypeOrmModule.forFeature([Authority])],
    providers: [AuthorityService, AuthorityResolvers]
})

export class AuthorityModule { }