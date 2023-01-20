import { Transform } from 'class-transformer';

export class QueryParamDTO {
  limit?: number;
  page?: number;
  sort?: { [index: string]: string };
  [index: string]: any;
}
