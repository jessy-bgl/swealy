import { ValidationPipe } from '@nestjs/common';

const validationPipe = new ValidationPipe({ transform: true });

export { validationPipe };
