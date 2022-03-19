import { ValidationPipe } from '@nestjs/common';

const validationPipe = new ValidationPipe({
  transform: true,
  stopAtFirstError: true,
});

export { validationPipe };
