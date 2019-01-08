import { Entity, ObjectIdColumn, Column, ObjectID } from "typeorm";
import { Transform } from "class-transformer";

@Entity()

export class User {
    @ObjectIdColumn()
    // @Transform((id: ObjectID) => id.toHexString(), {toPlainOnly: true})
    _id?: string;

    @Column() userName: string;

    @Column() password: string;

    @Column() roles: string;

    constructor(userName: string, password: string, roles: string) {
        this.userName = userName
        this.password = password;
        this.roles = roles;
    }
}

