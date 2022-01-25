import { DocumentBuilder, SwaggerDocumentOptions } from '@nestjs/swagger';

export const swaggerPath = 'api/doc';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('CRYPTO DCA REST API')
  .setVersion('1.0')
  .build();

export const swaggerOptions: SwaggerDocumentOptions = {
  deepScanRoutes: true,
};
