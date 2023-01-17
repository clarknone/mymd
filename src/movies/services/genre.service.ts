import { Injectable } from '@nestjs/common';
import { IQueryParams } from 'src/helper/interfaces/movie.interface';
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

  async findAll(filter: IQueryParams) {
    const { page = 1, limit = 10 } = filter;
    const skip = (page - 1 || 0) * limit;
    const result = await this.prismaService.$transaction([
      this.prismaService.genre.count(),
      this.prismaService.genre.findMany({ skip, take: +limit }),
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
