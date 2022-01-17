import { FastifyReply } from 'fastify';
import {
  Catch,
  ArgumentsHost,
  HttpException,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost): unknown {
    const response = host.switchToHttp().getResponse<FastifyReply>();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const newResponse =
      exception instanceof HttpException
        ? exception.getResponse()
        : {
            statusCode: httpStatus,
            message: exception.message,
          };

    // TODO : use the logger
    if (httpStatus === 500) console.log(newResponse);

    return response
      .status(httpStatus)
      .send(httpStatus === 500 ? 'Internal server error' : newResponse);
  }
}
