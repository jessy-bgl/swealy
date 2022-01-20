import { FastifyReply } from 'fastify';
import {
  Catch,
  ArgumentsHost,
  HttpException,
  ExceptionFilter,
  HttpStatus,
  Logger,
} from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger('ExceptionsCatcher');

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

    if (httpStatus === 500) this.logger.error(newResponse);

    return response
      .status(httpStatus)
      .send(
        httpStatus === 500
          ? { statusCode: httpStatus, message: 'Internal server error' }
          : newResponse,
      );
  }
}
