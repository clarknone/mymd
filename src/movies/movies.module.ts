import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { GenreService } from './services/genre.service';
import { RouterModule } from '@nestjs/core';
import { GenreModule } from './module/genre.module';
import { MovieModule } from './module/movies.module';

@Module({
  imports: [
    GenreModule,
    MovieModule,
    RouterModule.register([
      {
        path: 'movies',
        children: [
          { path: '/', module: MovieModule },
          { path: 'genre', module: GenreModule },
        ],
      },
    ]),
  ],
  providers: [MoviesService, GenreService],
})
export class MoviesModule {}
