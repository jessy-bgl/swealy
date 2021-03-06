import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ExchangesEnum } from '../../domain/models/exchange';

@Schema()
class Exchange {
  _id: Types.ObjectId;

  @Prop({ type: String, required: true })
  name: ExchangesEnum;

  @Prop({ type: String, required: true, unique: true })
  label: string;

  @Prop({ type: String, required: true })
  apiKey: string;

  @Prop({ type: String, required: true })
  apiSecret: string;

  @Prop({ type: String })
  subaccountName?: string;
}

type ExchangeDocument = Exchange & Document;

const ExchangeSchema = SchemaFactory.createForClass(Exchange);

export { Exchange, ExchangesEnum, ExchangeDocument, ExchangeSchema };
