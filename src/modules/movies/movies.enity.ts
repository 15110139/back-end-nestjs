import { Entity, Column, ObjectIdColumn, ObjectID } from 'typeorm';

@Entity()
export class Movie {
  @ObjectIdColumn() _id: string;

  @Column() title: string;

  @Column() director: string;

  @Column() description: string;

}

