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
import { JwtGuard } from 'src/helper/auth/user.guard';
import { GenreService } from '../services/genre.service';
import { CreateGenreDto, UpdateGenreDto } from '../dto/genre/genre.dto';

@Controller()
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @UseGuards(JwtGuard)
  @Post()
  create(@Body() createMovieDto: CreateGenreDto) {
    return this.genreService.create(createMovieDto);
  }

  @Get()
  findAll() {
    return this.genreService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.genreService.findOne(+id);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateMovieDto: UpdateGenreDto,
  ) {
    return this.genreService.update(+id, updateMovieDto).catch((e) => {
      throw new NotFoundException({ error: 'Failed to update' });
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.genreService.remove(+id);
  }
}
