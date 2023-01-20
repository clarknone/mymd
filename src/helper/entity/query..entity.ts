export class QueryParamsEntity {
  [index: string]: any;
  skip?: number;
  take?: number;
  orderBy?: { [index: string]: any };
  where?: { [index: string]: any };
}
