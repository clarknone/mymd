import { Injectable } from '@nestjs/common';
import { AuthUser } from 'src/auth/entities/auth.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMovieDto } from './dto/movie/create-movie.dto';
import { UpdateMovieDto } from './dto/movie/update-movie.dto';

@Injectable()
export class MoviesService {
  constructor(private prismaService: PrismaService) {}

  create(createMovieDto: CreateMovieDto, user: AuthUser) {
    const { genres, ...data } = createMovieDto;
    return this.prismaService.movie.create({
      data: {
        ...data,
        genres: { connect: [...genres] },
        user: { connect: { email: user.email } },
      },
    });
  }

  async findAll() {
    return await this.prismaService.movie.findMany({
      include: { genres: true },
    });
  }

  async findOne(id: number) {
    return await this.prismaService.movie.findUnique({ where: { id: id } });
  }

  async update(id: number, updateMovieDto: UpdateMovieDto, user: AuthUser) {
    const { genres, ...data } = updateMovieDto;
    return await this.prismaService.movie.update({
      where: { id: id },
      data: { ...data, user: { connect: { email: user.email } } },
    });
  }

  async remove(id: number) {
    return await this.prismaService.movie.delete({ where: { id: id } });
  }
}
