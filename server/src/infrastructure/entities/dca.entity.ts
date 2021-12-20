import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';
import { Exchange } from './exchange.entity';

@Schema()
class Dca {
  _id: Types.ObjectId;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    required: true,
    ref: Exchange.name,
  })
  exchange: Exchange;

  @Prop({ type: String, required: true })
  pair: string;

  @Prop({ type: Number, required: true })
  frequencyInDays: number;

  @Prop({ type: Number, required: true, default: 0 })
  hour: number;

  @Prop({ type: String, required: true })
  price: number;
}

type DcaDocument = Dca & Document;

const DcaSchema = SchemaFactory.createForClass(Dca);

export { Dca, DcaDocument, DcaSchema };
