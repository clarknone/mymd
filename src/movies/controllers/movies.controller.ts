import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  NotFoundException,
  Query,
  Catch,
  UseFilters,
  UseInterceptors,
  UploadedFile,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { MoviesService } from '../movies.service';
import { CreateMovieDto } from '../dto/movie/create-movie.dto';
import { UpdateMovieDto } from '../dto/movie/update-movie.dto';
import { GetAuthUser } from 'src/helper/auth/user.decorator';
import { AuthUser } from 'src/auth/entities/auth.entity';
import { JwtGuard } from 'src/helper/auth/user.guard';
import { QueryParamDTO } from 'src/helper/dto/queryparams.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { MovieEntityResponse } from '../entities/movie.entity';

@Controller()
export class MoviesController {
  constructor(
    private readonly moviesService: MoviesService,
    private cloudinaryService: CloudinaryService,
  ) {}

  @UseGuards(JwtGuard)
  @UseInterceptors(FileInterceptor('image'))
  @Post()
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createMovieDto: CreateMovieDto,
    @GetAuthUser() user: AuthUser,
  ) {
    if (file) {
      const response = await this.cloudinaryService.uploadImage(file);
      createMovieDto.image = response.secure_url || '';
    }
    return this.moviesService.create(createMovieDto, user);
  }

  @Get()
  findAll(@Query() params: QueryParamDTO) {
    return this.moviesService.findAll(params);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<MovieEntityResponse> {
    let movie = await this.moviesService.findOne(+id);
    if (!movie) {
      throw new NotFoundException('Invalid ID, Movie not found');
    }
    const response = new MovieEntityResponse({ ...movie });
    return response;
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @GetAuthUser() user: AuthUser,
    @Body() updateMovieDto: UpdateMovieDto,
  ) {
    return this.moviesService.update(+id, updateMovieDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.moviesService.remove(+id);
  }
}
