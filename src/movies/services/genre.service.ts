import { Injectable } from '@nestjs/common';
import { QueryParamDTO } from 'src/helper/dto/queryparams.dto';
import { QueryParamsEntity } from 'src/helper/entity/query..entity';
import { IQueryParams } from 'src/helper/interfaces/movie.interface';
import parseQueryParams from 'src/helper/services/filter';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateGenreDto, UpdateGenreDto } from '../dto/genre/genre.dto';

@Injectable()
export class GenreService {
  constructor(private prismaService: PrismaService) {}

  async create(createGenreDto: CreateGenreDto) {
    const genre = await this.prismaService.genre.create({
      data: { ...createGenreDto },
    });
    return genre;
  }

  async findAll(filter: QueryParamDTO) {
    const queryFilter: QueryParamsEntity = parseQueryParams(filter);
    const result = await this.prismaService.$transaction([
      this.prismaService.genre.count(),
      this.prismaService.genre.findMany({
        // where: { ...(queryFilter.where || null) },
        // orderBy: { ...(queryFilter.orderBy || null) },
        skip: queryFilter.skip,
        take: queryFilter.take,
      }),
    ]);

    const genres = result[1];
    return { meta: { count: result[0] || 0 }, data: genres };
  }

  async findOne(id: number) {
    return await this.prismaService.genre.findUnique({
      where: {
        id: id,
      },
    });
  }

  async update(id: number, updateMovieDto: UpdateGenreDto) {
    return await this.prismaService.genre.update({
      where: { id: id },
      data: { ...updateMovieDto },
    });
  }

  async remove(id: number) {
    return await this.prismaService.genre.delete({
      where: {
        id: id,
      },
    });
  }
}
