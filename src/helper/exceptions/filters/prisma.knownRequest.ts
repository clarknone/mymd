import {
  ArgumentsHost,
  Catch,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

@Catch(PrismaClientKnownRequestError)
export class PrimsaErrorExceptionFitler extends BaseExceptionFilter {
  catch(exception: any, host: ArgumentsHost): void {
    console.log(exception);
    const metaKeys = Object.keys(exception.meta || {});
    const message =
      exception.meta?.[metaKeys[0]] || 'Failed to process request';
    super.catch(new HttpException(message, HttpStatus.BAD_REQUEST), host);
  }
}
