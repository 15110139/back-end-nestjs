import { Resolver, Args, Mutation } from "@nestjs/graphql";
import { Query } from "@nestjs/common";
import { async } from "rxjs/internal/scheduler/async";
import { UserService } from "./user.service";
import { User } from "./user.enity";
import jwt = require('jsonwebtoken')
@Resolver('User')

export class UserResolvers {
    constructor(private readonly userService: UserService) { }
    @Query()
    async getInfoUser(@Args('userId') userId: string): Promise<User> {
        return this.userService.getInfoUserById(userId)
    }

    @Mutation()
    async Login(@Args('loginInput') loginInput: User) {
        const user: User = await this.userService.getInfoUserByUserName(loginInput.userName)
        if (!user) {
            throw new Error('NOT_FOUND_USER')
        }
        if (user.password !== loginInput.password)
            throw new Error('INCORRECT_PASSWORD')
        const token = jwt.sign({ userId: user._id }, 'GO', { expiresIn: 10000 })
        return token
    }
    @Mutation()
    async Register(@Args('registerInput') registerInput: User): Promise<User> {
        console.log('registerInput', registerInput)
        const newUser = await this.userService.register(registerInput)
        return newUser
    }

}