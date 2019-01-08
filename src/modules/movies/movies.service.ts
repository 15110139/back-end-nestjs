import { Injectable } from '@nestjs/common';
import { CreateMovieDTO } from './dto/create-movie.dto';
import { getMongoRepository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from './movies.entity'

@Injectable()
export class MoviesService {
    constructor(
        @InjectRepository(Movie)
        private movieRepository = getMongoRepository(Movie)
    ) { }

    async getMovies(): Promise<Movie[]> {
        return await this.movieRepository.find()
    }

    async getMovieById(movieId: string): Promise<Movie> {
        return await this.movieRepository.findOne({ _id: movieId })
    }

    async createMovie(movie: CreateMovieDTO): Promise<Movie> {
        const newMove = new Movie(movie.title, movie.director, movie.description)
        console.log('newMove', newMove)
        return await this.movieRepository.save(newMove)
    }
}
