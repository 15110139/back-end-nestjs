import { Entity, Column, ObjectIdColumn } from 'typeorm';
const uuidv4 = require('uuid/v4');



@Entity()
export class Movie {

  @ObjectIdColumn() _id: string;

  @Column() title: string;

  @Column() director: string;

  @Column() description: string;

  constructor(title: string, director: string, description: string) {
    this._id = uuidv4()
    this.title = title
    this.director = director;
    this.description = description;
  }

}

