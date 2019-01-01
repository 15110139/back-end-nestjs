import { Entity, ObjectIdColumn, Column } from "typeorm";

@Entity()

export class User {
    @ObjectIdColumn() _id: string;

    @Column() userName: string;

    @Column() password: string;

    @Column() roles: string;
}