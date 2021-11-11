import { Module } from '@nestjs/common';
import { DatabaseModule } from './config/mongoose/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
