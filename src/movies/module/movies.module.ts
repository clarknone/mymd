import { Module } from '@nestjs/common';
import { MoviesService } from '../movies.service';
import { MoviesController } from '../controllers/movies.controller';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  imports:[CloudinaryModule,],
  controllers: [MoviesController],
  providers: [MoviesService,CloudinaryService],
})
export class MovieModule {}
