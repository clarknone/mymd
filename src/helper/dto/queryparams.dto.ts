import { Transform } from 'class-transformer';
import { IsNumber, IsObject, IsOptional } from 'class-validator';

export class QueryParamDTO {
  @Transform(({ value }) => (value ? parseInt(value) : value))
  @IsOptional()
  @IsNumber()
  limit?: number;

  @Transform(({ value }) => (value ? parseInt(value) : value))
  @IsOptional()
  @IsNumber()
  page?: number;

  @IsOptional()
  orderBy?: string;

  @IsOptional()
  // @IsObject()
  // sort?: { [index: string]: string };
  sort?: string;

  [index: string]: any;
}
