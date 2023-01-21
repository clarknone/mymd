import { createParamDecorator, ExecutionContext, ValidationPipe } from "@nestjs/common";

export const RawQuery = createParamDecorator(
    (data: unknown, ctx: ExecutionContext): any => {
      const request = ctx.switchToHttp().getRequest();
      return request.query;
    },
  );
  
  export const CustomQuery = () =>
    RawQuery(
      new ValidationPipe({
        validateCustomDecorators: true,
        whitelist: false,
        transform: true,
        skipMissingProperties: true,
      }),
    );