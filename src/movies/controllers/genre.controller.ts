import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetAuthUser } from 'src/helper/auth/user.decorator';
import { AuthUser } from 'src/auth/entities/auth.entity';
import { JwtGuard } from 'src/helper/auth/user.guard';
import { GenreService } from '../services/genre.service';
import { CreateGenreDto, UpdateGenreDto } from '../dto/genre/genre.dto';

@Controller('movies/genre')
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @Post()
  create(@Body() createMovieDto: CreateGenreDto) {
    return this.genreService.create(createMovieDto);
  }

  @UseGuards(JwtGuard)
  @Get()
  findAll(@GetAuthUser() user: AuthUser) {
    return user;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.genreService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMovieDto: UpdateGenreDto) {
    return this.genreService.update(+id, updateMovieDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.genreService.remove(+id);
  }
}
