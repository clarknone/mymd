import { Injectable } from '@nestjs/common';
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

  async findAll() {
    const genres = await this.prismaService.genre.findMany();
    return genres;
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
