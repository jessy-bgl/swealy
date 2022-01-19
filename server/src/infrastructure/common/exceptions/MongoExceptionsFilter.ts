import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common';
import { MongoError } from 'mongodb';
import { FastifyReply } from 'fastify';

@Catch(MongoError)
class MongoExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger('MongoExceptionsCatcher');

  catch(exception: MongoError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<FastifyReply>();

    if (exception.code === 11000) {
      const statusCode = 409;
      response
        .status(statusCode)
        .send({ statusCode, message: 'This resource already exists' });
    } else {
      const statusCode = 500;
      this.logger.error(
        `MongoDB error (${exception.code}) : ${exception.message}`,
      );
      response
        .status(statusCode)
        .send({ statusCode, message: 'Internal server error' });
    }
  }
}

export { MongoExceptionsFilter };
