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
  UseFilters,
} from '@nestjs/common';
import { JwtGuard } from 'src/helper/auth/user.guard';
import { GenreService } from '../services/genre.service';
import { CreateGenreDto, UpdateGenreDto } from '../dto/genre/genre.dto';
import { PrimsaErrorExceptionFitler } from 'src/helper/exceptions/filters/prisma.knownRequest';

@UseFilters(PrimsaErrorExceptionFitler)
@Controller()
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @UseGuards(JwtGuard)
  @Post()
  create(@Body() createMovieDto: CreateGenreDto) {
    return this.genreService.create(createMovieDto);
  }

  @Get()
  findAll(@Query() params) {
    const { page = 1, limit = 10 } = params;
    return this.genreService.findAll({ page, limit });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const genre = await this.genreService.findOne(+id);
    if (!genre) {
      throw new NotFoundException("Invalid ID, Genre not found");
    }
    return genre;
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateMovieDto: UpdateGenreDto,
  ) {
    return this.genreService.update(+id, updateMovieDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.genreService.remove(+id);
  }
}
