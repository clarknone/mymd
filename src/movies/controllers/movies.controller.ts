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
} from '@nestjs/common';
import { MoviesService } from '../movies.service';
import { CreateMovieDto } from '../dto/movie/create-movie.dto';
import { UpdateMovieDto } from '../dto/movie/update-movie.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetAuthUser } from 'src/helper/auth/user.decorator';
import { AuthUser } from 'src/auth/entities/auth.entity';
import { JwtGuard } from 'src/helper/auth/user.guard';

@Controller()
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @UseGuards(JwtGuard)
  @Post()
  create(
    @Body() createMovieDto: CreateMovieDto,
    @GetAuthUser() user: AuthUser,
  ) {
    return this.moviesService.create(createMovieDto, user);
  }

  @Get()
  findAll() {
    return this.moviesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.moviesService.findOne(+id);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @GetAuthUser() user: AuthUser,
    @Body() updateMovieDto: UpdateMovieDto,
  ) {
    return this.moviesService.update(+id, updateMovieDto, user).catch((e) => {
      throw new NotFoundException({ error: 'failed to update' });
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.moviesService.remove(+id);
  }
}
