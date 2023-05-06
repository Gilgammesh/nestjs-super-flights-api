import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePassengerDto, UpdatePassengerDto } from './dtos';
import { Passenger } from './entities/passenger.entity';

@Injectable()
export class PassengersService {
  constructor(
    @InjectModel(Passenger.name)
    private readonly passengerModel: Model<Passenger>,
  ) {}

  async create(createPassengerDto: CreatePassengerDto): Promise<Passenger> {
    const newPassenger = await this.passengerModel.create(createPassengerDto);
    return newPassenger;
  }

  async findAll(): Promise<Passenger[]> {
    const passengers = await this.passengerModel.find();
    return passengers;
  }

  async findOne(id: string): Promise<Passenger> {
    const passenger = await this.passengerModel.findById(id);
    if (!passenger) {
      throw new NotFoundException('The Passenger was not found');
    }
    return passenger;
  }

  async update(
    id: string,
    updatePassengerDto: UpdatePassengerDto,
  ): Promise<Passenger> {
    const updatedPassenger = await this.passengerModel.findByIdAndUpdate(
      id,
      updatePassengerDto,
      { new: true },
    );
    if (!updatedPassenger) {
      throw new BadRequestException('Passenger not found');
    }
    return updatedPassenger;
  }

  async remove(id: string): Promise<void> {
    const deletedPassenger = await this.passengerModel.findByIdAndDelete(id);
    if (!deletedPassenger) {
      throw new BadRequestException('Passenger not found');
    }
  }
}
