import { Args, Mutation, Query, Resolver, Subscription, } from '@nestjs/graphql';
import { MoviesService } from './movies.service';
import { CreateMovieDTO } from './dto/create-movie.dto';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../../guard/roles.guard';
import { Movie } from './movies.enity';
import { PubSub } from 'graphql-subscriptions';


@Resolver('Movie')
export class MoviesResolvers {
    constructor(private readonly MoviesService: MoviesService) { }
    private pubSub = new PubSub();
    @Query()
    async getMovies() {
        return await this.MoviesService.getMovies()
    }

    @Query('movie')
    async movie(
        @Args('id')
        id: string,
    ): Promise<Movie> {
        return await this.MoviesService.getMovie(id)
    }

    @Mutation('createMovie')
    @UseGuards(RolesGuard)
    async create(@Args('createMovieInput') args: CreateMovieDTO): Promise<Movie> {
        const createdMovie = await this.MoviesService.addMovie(args);
        this.pubSub.publish('createdMovie', { createdMovie })
        return createdMovie;
    }

    @Subscription('createdMovie')
    createdMovie() {
        return {
            subscribe: () => this.pubSub.asyncIterator('createdMovie')
        }
    }
}
