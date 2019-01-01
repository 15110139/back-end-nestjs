import { Args, Mutation, Query, Resolver, Subscription, } from '@nestjs/graphql';
import { MoviesService } from './movies.service';
import { CreateMovieDTO } from './dto/create-movie.dto';
import { UseGuards, UseInterceptors } from '@nestjs/common';
import { RolesGuard } from '../../guard/roles.guard';
import { Movie } from './movies.entity';
import { PubSub } from 'graphql-subscriptions';
import { validationObj } from '../../validation/validationObj.pipe';
import { LoggingInterceptor } from '../../interceptors/logging.interceptor';
import { validationArgs } from '../../validation/validationArgs.pipe';


@Resolver('Movie')
@UseInterceptors(LoggingInterceptor)
export class MoviesResolvers {
    constructor(private readonly moviesService: MoviesService) { }
    private pubSub = new PubSub();
    @Query()

    async getMovies() {
        console.log('---------------------')
        return await this.moviesService.getMovies()
    }

    @Query('movie')

    async movie(
        @Args('movieId', new validationArgs())
        movieId,
    ): Promise<Movie> {
        return await this.moviesService.getMovieById(movieId)
    }

    @Mutation('createMovie')
    @UseGuards(RolesGuard)
    // @UseInterceptors(ErrorsInterceptor)
    async createMovie(@Args(new validationObj()) args: CreateMovieDTO): Promise<Movie> {
        try {
            const newMove = Object['values'](args)[0]
            console.log(newMove)
            const createdMovie = await this.moviesService.createMovie(newMove);
            this.pubSub.publish('createdMovie', { createdMovie })
            return createdMovie;
        } catch (error) {
            console.error(error)
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
