import { Module } from '@nestjs/common';
// import { MoviesController } from './movies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoviesService } from './movies.service';
import { MoviesResolvers } from './movies.resolvers'
import { Movie } from './movies.enity';
import { RolesModule } from '../../guard/roles.module';

@Module({
  imports: [TypeOrmModule.forFeature([Movie]), RolesModule],
  providers: [MoviesService, MoviesResolvers],
})
export class MoviesModule { }
