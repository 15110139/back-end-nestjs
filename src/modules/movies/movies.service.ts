import { Injectable } from '@nestjs/common';
import { CreateMovieDTO } from './dto/create-movie.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from './movies.entity'

@Injectable()
export class MoviesService {
    constructor(
        @InjectRepository(Movie)
        private movieRepository: Repository<Movie>
    ) { }

    async getMovies(): Promise<Movie[]> {
        return await this.movieRepository.find()
    }

    async getMovie(movieID): Promise<Movie> {
        const fetchedMovie = await this.movieRepository.findOne({ _id: movieID })
        return fetchedMovie;
    }

    async addMovie(createMovieDTO: CreateMovieDTO): Promise<Movie> {
        const newMove = new Movie()
        newMove.title = createMovieDTO.title
        newMove.director = createMovieDTO.director
        newMove.description = createMovieDTO.description
        return await this.movieRepository.save(newMove)
    }
}
