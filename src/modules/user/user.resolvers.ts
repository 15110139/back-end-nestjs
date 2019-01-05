import { Resolver, Args, Mutation, Query } from "@nestjs/graphql";
import { UserService } from "./user.service";
import { User } from "./user.enity";
import jwt = require('jsonwebtoken')
import { UseInterceptors } from "@nestjs/common";
import { LoggingInterceptor } from "interceptors/logging.interceptor";

@Resolver('User')
@UseInterceptors(LoggingInterceptor)
export class UserResolvers {
    constructor(private readonly userService: UserService) { }


    @Query('getInfoUser')
    async getInfoUser(@Args('userId') userId: string): Promise<User> {
        try {
            return await this.userService.userLoader.load(userId)
        } catch (error) {
            throw new Error(error)
        }
    }

    @Mutation('login')
    async login(@Args('loginInput') loginInput: User) {
        try {
            const user: User = await this.userService.getInfoUserByUserName(loginInput.userName)
            if (!user) {
                throw ('NOT_FOUND_USER')
            }
            if (user.password !== loginInput.password)
                throw ('INCORRECT_PASSWORD')
            const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: process.env.EXPIRES_IN })
            return token

        } catch (error) {
            throw new Error(error)
        }
    }
    @Mutation('register')
    async register(@Args('registerInput') registerInput: User): Promise<User> {
        try {
            const newUser = await this.userService.register(registerInput)
            return newUser
        } catch (error) {
            throw new Error(error)
        }
    }

}