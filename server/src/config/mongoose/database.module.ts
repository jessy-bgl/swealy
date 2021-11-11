import { MongooseModule } from '@nestjs/mongoose';
import { MONGO_URI } from '../constants';

const DatabaseModule = MongooseModule.forRoot(MONGO_URI);

export { DatabaseModule };
