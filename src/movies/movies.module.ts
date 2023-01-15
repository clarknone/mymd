import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { GenreController } from './controllers/genre.controller';
import { GenreService } from './services/genre.service';

@Module({
  controllers: [MoviesController, GenreController],
  providers: [MoviesService, GenreService],
})
export class MoviesModule {}
