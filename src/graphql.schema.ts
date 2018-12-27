export enum Episode {
    NEWHOPE = "NEWHOPE",
    EMPIRE = "EMPIRE",
    JEDI = "JEDI"
}

export class CreateMovieInput {
    title?: string;
    director?: string;
    description?: string;
}

export class LoginInput {
    userName?: string;
    password?: string;
}

export class RegisterInput {
    userName?: string;
    password?: string;
    roles?: Episode;
}

export class Movie {
    title?: string;
    director?: string;
    description?: string;
}

export abstract class IMutation {
    abstract createMovie(createMovieInput?: CreateMovieInput): Movie | Promise<Movie>;

    abstract Register(registerInput: RegisterInput): User | Promise<User>;

    abstract Login(loginInput?: LoginInput): string | Promise<string>;
}

export abstract class IQuery {
    abstract getMovies(): Movie[] | Promise<Movie[]>;

    abstract movie(id: string): Movie | Promise<Movie>;

    abstract getInfoUser(userId?: string): User | Promise<User>;

    abstract temp__(): boolean | Promise<boolean>;
}

export abstract class ISubscription {
    abstract createMovie(): Movie | Promise<Movie>;
}

export class User {
    userName?: string;
    roles?: string;
}
