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

  findOne(id: number) {
    return `This action returns a #${id} movie`;
  }

  update(id: number, updateMovieDto: UpdateGenreDto) {
    return `This action updates a #${id} movie`;
  }

  remove(id: number) {
    return `This action removes a #${id} movie`;
  }
}
