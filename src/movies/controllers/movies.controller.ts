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
} from '@nestjs/common';
import { MoviesService } from '../movies.service';
import { CreateMovieDto } from '../dto/movie/create-movie.dto';
import { UpdateMovieDto } from '../dto/movie/update-movie.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetAuthUser } from 'src/helper/auth/user.decorator';
import { AuthUser } from 'src/auth/entities/auth.entity';
import { JwtGuard } from 'src/helper/auth/user.guard';
import { PrimsaErrorExceptionFitler } from 'src/helper/exceptions/filters/prisma.knownRequest';

@UseFilters(PrimsaErrorExceptionFitler)
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
  findAll(@Query() params) {
    return this.moviesService.findAll(params);
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
    // return this.moviesService.update(+id, updateMovieDto, user).catch((e) => {
    //   console.log({ e });
    //   throw new NotFoundException('failed to update');
    // });
    return this.moviesService.update(+id, updateMovieDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.moviesService.remove(+id);
  }
}
