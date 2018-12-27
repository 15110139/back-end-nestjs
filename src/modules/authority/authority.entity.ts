import { Entity, ObjectIdColumn, Column } from "typeorm";

@Entity()
export class Authority {
    @ObjectIdColumn() _id : string;

    @Column() roles:string;

    @Column() functionRoles: string []
}