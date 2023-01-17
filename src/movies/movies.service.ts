import { Injectable } from '@nestjs/common';
import { AuthUser } from 'src/auth/entities/auth.entity';
import { IQueryParams } from 'src/helper/interfaces/movie.interface';
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

  async findAll(filter: IQueryParams) {
    const { page = 1, limit = 10 } = filter;
    const skip = (page - 1 || 0) * limit;
    const result = await this.prismaService.$transaction([
      this.prismaService.movie.count(),
      this.prismaService.movie.findMany({
        skip,
        take: +limit,
        include: { genres: true },
      }),
    ]);

    const movies = result[1];
    return { meta: { count: result[0] || 0 }, data: movies };
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
