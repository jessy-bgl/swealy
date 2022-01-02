import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Schema as MongooseSchema } from 'mongoose';
import { OrderTypesEnum } from '../../domain/models/transaction';
import { Dca } from './dca.entity';

@Schema()
class Transaction {
  _id: Types.ObjectId;

  @Prop({ type: Date, default: Date.now })
  datetime: Date;

  @Prop({ type: Boolean, required: true })
  success: boolean;

  @Prop({ type: Boolean, default: false })
  manual: boolean;

  @Prop({ type: Number, required: true, min: 0 })
  amount: number;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    required: true,
    ref: Dca.name,
  })
  dca: Dca | Types.ObjectId;

  @Prop({ type: String, required: true })
  pair: string;

  @Prop({ type: Number, min: 0 })
  price?: number;

  @Prop({ type: Number, min: 0 })
  size?: number;

  @Prop({ type: String, enum: OrderTypesEnum })
  type?: OrderTypesEnum;

  @Prop({ type: String })
  description?: string;
}

type TransactionDocument = Transaction & Document;

const TransactionSchema = SchemaFactory.createForClass(Transaction);

TransactionSchema.index({ datetime: 1 });
TransactionSchema.index({ datetime: -1 });

export { Transaction, TransactionDocument, TransactionSchema };
