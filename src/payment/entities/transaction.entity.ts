import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export type TransactionDocument = HydratedDocument<Transaction>;

@Schema({
  timestamps: true,
})
export class Transaction extends Document {
  @Prop({ type: uuidv4, default: uuidv4 })
  _id: string;

  @Prop({
    required: true,
    type: String,
  })
  order: string;

  @Prop({
    required: true,
  })
  amount: number;

  @Prop({
    required: true,
  })
  buyer: string;

  @Prop({ type: [{ type: String }], required: true })
  items: string[];

  @Prop()
  status: string;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
