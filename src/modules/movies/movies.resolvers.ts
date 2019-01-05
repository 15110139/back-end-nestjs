import { Args, Mutation, Query, Resolver, Subscription, } from '@nestjs/graphql';
import { MoviesService } from './movies.service';
import { CreateMovieDTO } from './dto/create-movie.dto';
import { UseGuards, UseInterceptors, UseFilters, ForbiddenException } from '@nestjs/common';
import { RolesGuard } from '../../guard/roles.guard';
import { Movie } from './movies.entity';
import { PubSub } from 'graphql-subscriptions';
import { LoggingInterceptor } from '../../interceptors/logging.interceptor';
import { validationInput } from '../../validation/validationInput.pipe';
import { ArgsObj } from 'decorators/getvaluainput.decorators';
import { ErrorsInterceptor } from 'interceptors/errors.interceptor';
import { HttpExceptionFilter } from 'validation/http-exception.filter';


@Resolver('Movie')
@UseInterceptors(LoggingInterceptor)
@UseInterceptors(ErrorsInterceptor)
export class MoviesResolvers {
    constructor(private readonly moviesService: MoviesService) { }
    private pubSub = new PubSub();

    @UseGuards(RolesGuard)
    @Query()
    
    async getMovies() {
        try {
            return await this.moviesService.getMovies()
        } catch (error) {
            console.error(error)
            throw new Error(error)
        }
    }
    @Mutation('changeENV')
    async changeENV(@Args('env') env: string) {
        throw new ForbiddenException();
    }

    @Query('getENV')
    async getENV() {
        return process.env.NODE_ENV
    }


    // @UseGuards(RolesGuard)
    @Query('movie')
    async movie(
        @Args('movieId', new validationInput())
        movieId,
    ): Promise<Movie> {
        try {
            return await this.moviesService.getMovieById(movieId)
        } catch (error) {
            console.log(error)
            throw new Error(error)
        }
    }
    // @UseGuards(RolesGuard)
    @Mutation('createMovie')
    // @UseInterceptors(ErrorsInterceptor)
    async createMovie(@ArgsObj(new validationInput()) args: CreateMovieDTO): Promise<Movie> {
        try {
            // const newMove = Object['values'](args)[0]
            const createdMovie = await this.moviesService.createMovie(args);
            this.pubSub.publish('createdMovie', { createdMovie })
            return createdMovie;
        } catch (error) {

            throw new Error(error)
        }
    }

    @Subscription('createdMovie')
    createdMovie() {
        return {
            subscribe: () => this.pubSub.asyncIterator('createdMovie')
        }
    }
}
