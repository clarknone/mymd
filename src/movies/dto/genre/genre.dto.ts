import { PartialType } from '@nestjs/mapped-types';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateGenreDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}

export class GenreRelationDto {
  // @IsNotEmpty()
  @IsOptional()
  @Transform(({ value }) => (value ? parseInt(value) : value))
  @IsNumber()
  id: number;

  title?: string;
  description?: string;
}

export class UpdateGenreDto extends PartialType(CreateGenreDto) {}
