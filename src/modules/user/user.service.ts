import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { getMongoRepository } from "typeorm";
import { User } from "./user.enity";
import DataLoader = require('dataloader')
const ObjectId = require('mongodb').ObjectId;


@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private userRepository = getMongoRepository(User)
    ) { }

    private batchUser = async (userIds: string[]): Promise<User[]> => {
        console.log('--------------', userIds)
        const objUserIds: string[] = userIds.map(userId => ObjectId(userId))
        const users = await this.userRepository.find({ _id: { $in: objUserIds } })
        const userMap: { [key: string]: User } = {}
        users.forEach(u => {
            userMap[u._id] = u
        })
        return userIds.map(id => userMap[id])
    }
    async getInfoUserById(userId: string): Promise<User> {
        console.log('--------------', userId)
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
    public userLoader = new DataLoader<string, User>(
        this.batchUser, { maxBatchSize: 2 }
    )
}