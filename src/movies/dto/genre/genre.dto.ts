import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateGenreDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}

export class GenreRelationDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  title?: string;
  description?: string;
}

export class UpdateGenreDto extends PartialType(CreateGenreDto) {}
