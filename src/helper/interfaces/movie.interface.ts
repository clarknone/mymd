export interface IGenre {
  id?: number;
  title?: string;
  description?: string;
}


export interface IQueryParams {
  page?: number;
  limit?: number;
  [index: string]: any;
}