import { QueryParamDTO } from '../dto/queryparams.dto';
import { QueryParamsEntity } from '../entity/query..entity';
import { normalizeNullFields } from './misc';

export default function parseQueryParams(
  queryParamDto: QueryParamDTO,
): QueryParamsEntity {
  const queryParams: QueryParamsEntity = {};
  const { page, limit, sort, ...filter } = queryParamDto;
  queryParams.skip = page && page * queryParamDto.limit;
  queryParams.take = queryParamDto.limit;
  queryParams.orderBy = queryParamDto.sort;
  queryParams.where = { ...filter };
  console.log({queryParamDto})
  return normalizeNullFields({ queryParams }, { allowZero: true });
}
