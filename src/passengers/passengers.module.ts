import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassengersService } from './passengers.service';
import { PassengersController } from './passengers.controller';
import { Passenger, PassengerSchema } from './entities/passenger.entity';

@Module({
  controllers: [PassengersController],
  providers: [PassengersService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Passenger.name,
        schema: PassengerSchema,
      },
    ]),
  ],
  exports: [MongooseModule, PassengersService],
})
export class PassengersModule {}
