/* eslint-disable @typescript-eslint/no-var-requires */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FlightsService } from './flights.service';
import { FlightsController } from './flights.controller';
import { Flight, FlightSchema } from './entities/flight.entity';
import { PassengersModule } from 'src/passengers/passengers.module';

@Module({
  controllers: [FlightsController],
  providers: [FlightsService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Flight.name,
        schema: FlightSchema.plugin(require('mongoose-autopopulate')),
      },
    ]),
    PassengersModule,
  ],
})
export class FlightsModule {}
