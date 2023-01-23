import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  isObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { IGenre } from 'src/helper/interfaces/movie.interface';
import { IUser } from 'src/helper/interfaces/user.interface';
import {
  CreateGenreDto,
  GenreRelationDto,
  UpdateGenreDto,
} from '../genre/genre.dto';

export class CreateMovieDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  text: string;

  @IsNotEmpty()
  @IsString()
  overview: string;

  // @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => GenreRelationDto)
  @IsNotEmpty()
  genres?: GenreRelationDto[];

  user: IUser;

  @IsOptional()
  @IsString()
  image?: string;
}
