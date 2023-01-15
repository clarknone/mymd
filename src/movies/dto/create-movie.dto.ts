import { IsNotEmpty, IsString } from 'class-validator';
import { IGenre } from 'src/helper/interfaces/movie.interface';
import { IUser } from 'src/helper/interfaces/user.interface';

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

  @IsNotEmpty()
  @IsNotEmpty()
  genre: IGenre[];

  user: IUser;

  @IsString()
  image?: string;
}
