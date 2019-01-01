import { Resolver, Args, Mutation, Query } from "@nestjs/graphql";
import { UserService } from "./user.service";
import { User } from "./user.enity";

import jwt = require('jsonwebtoken')
@Resolver('User')
export class UserResolvers {
    constructor(private readonly userService: UserService) { }
    @Query('getInfoUser')

    async getInfoUser(@Args('userId') userId: string): Promise<User> {
        console.log('user', userId)
        // this.userService.userLoader.clear(userId)
        return await this.userService.userLoader.load(userId)
        // return await this.userService.getInfoUserById(userId)
    }

    @Query()

    async getListUser() {
        console.log('------------------')
    }

    @Query()

    LayTien() {
        return 'tien'
    }

    @Mutation('login')
    async login(@Args('loginInput') loginInput: User) {
        const user: User = await this.userService.getInfoUserByUserName(loginInput.userName)
        if (!user) {
            throw new Error('NOT_FOUND_USER')
        }
        if (user.password !== loginInput.password)
            throw new Error('INCORRECT_PASSWORD')
        const token = jwt.sign({ userId: user._id }, 'GO', { expiresIn: 10000 })
        return token
    }
    @Mutation('register')
    async register(@Args('registerInput') registerInput: User): Promise<User> {
        console.log('registerInput', registerInput)
        const newUser = await this.userService.register(registerInput)
        return newUser
    }

}