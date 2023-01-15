import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateGenreDto, UpdateGenreDto } from '../dto/genre/genre.dto';

@Injectable()
export class GenreService {
  constructor(private prismaService: PrismaService) {}

  create(createMovieDto: CreateGenreDto) {
    
    return 'This action adds a new movie';
  }

  findAll() {
    return `This action returns all movies`;
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
