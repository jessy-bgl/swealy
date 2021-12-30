import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { MongoError } from 'mongodb';

@Catch(MongoError)
class MongoExceptionsFilter implements ExceptionFilter {
  catch(exception: MongoError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();

    if (exception.code === 11000) {
      response.status(409).send({ message: 'resource already exists' });
    } else {
      response.status(500).send({ message: 'db internal error' });
    }
  }
}

export { MongoExceptionsFilter };
