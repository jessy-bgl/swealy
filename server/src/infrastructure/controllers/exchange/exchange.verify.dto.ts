import { IsMongoId, IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';

class CheckExchangeApiKeyDTO {
  @IsNotEmpty()
  @IsMongoId()
  id: string | Types.ObjectId;
}

export { CheckExchangeApiKeyDTO };
