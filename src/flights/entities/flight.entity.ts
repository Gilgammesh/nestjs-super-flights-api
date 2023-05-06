import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({
  timestamps: true,
  versionKey: false,
})
export class Flight extends Document {
  @Prop({
    type: String,
    required: true,
  })
  pilot: string;

  @Prop({
    type: String,
    required: true,
  })
  airplane: string;

  @Prop({
    type: String,
    required: true,
  })
  destinationCity: string;

  @Prop({
    type: Date,
    required: true,
  })
  flightDate: Date;

  @Prop({
    type: [Types.ObjectId],
    ref: 'Passenger',
  })
  passengers: Types.ObjectId[];
}

export const FlightSchema = SchemaFactory.createForClass(Flight);
