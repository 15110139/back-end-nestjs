import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./user.enity";
const ObjectId = require('mongodb').ObjectId;


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) { }

    async getInfoUserById(userId: string): Promise<User> {
        return await this.userRepository.findOne({ _id: ObjectId(userId) })
    }

    async getInfoUserByUserName(userName: string): Promise<User> {
        return await this.userRepository.findOne({ userName: userName })
    }

    async register(user: User): Promise<User> {
        const newUser = new User()
        newUser.password = user.password
        newUser.userName = user.userName
        newUser.roles = user.roles
        return await this.userRepository.save(newUser) 
    }
}