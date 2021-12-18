import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

enum ExchangeEnum {
  'BINANCE' = 'binance',
  'FTX' = 'ftx',
}

@Schema()
class Exchange {
  @Prop()
  name: ExchangeEnum;

  @Prop()
  label: string;

  @Prop()
  apiKey: string;

  @Prop()
  apiSecret: string;

  @Prop()
  subaccountName?: string;
}

type ExchangeDocument = Exchange & Document;

const ExchangeSchema = SchemaFactory.createForClass(Exchange);

export { Exchange, ExchangeEnum, ExchangeDocument, ExchangeSchema };
