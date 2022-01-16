import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { MongoError } from 'mongodb';
import { FastifyReply } from 'fastify';

@Catch(MongoError)
class MongoExceptionsFilter implements ExceptionFilter {
  catch(exception: MongoError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<FastifyReply>();

    if (exception.code === 11000) {
      const statusCode = 409;
      response
        .status(statusCode)
        .send({ statusCode, message: 'This resource already exists' });
    } else {
      const statusCode = 500;
      response
        .status(statusCode)
        .send({ statusCode, message: 'MongoDB internal error' });
    }
  }
}

export { MongoExceptionsFilter };
