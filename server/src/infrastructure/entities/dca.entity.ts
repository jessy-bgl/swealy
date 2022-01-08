import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';

import { Exchange } from './exchange.entity';

@Schema()
class Dca {
  _id: Types.ObjectId;

  @Prop({
    type: Boolean,
    default: true,
  })
  isActive: boolean;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    required: true,
    ref: Exchange.name,
  })
  exchange: Exchange | Types.ObjectId;

  @Prop({ type: String, required: true })
  pair: string;

  @Prop({ type: Number, required: true })
  frequencyInDays: number;

  @Prop({ type: Number, required: true, default: 0 })
  hour: number;

  @Prop({ type: Number, required: true })
  amount: number;

  @Prop({ type: Number, default: 0 })
  successfulTransactionsCounter: number;
}

type DcaDocument = Dca & Document;

const DcaSchema = SchemaFactory.createForClass(Dca);

export { Dca, DcaDocument, DcaSchema };
