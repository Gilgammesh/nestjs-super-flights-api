import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateFlightDto, UpdateFlightDto } from './dtos';
import { Flight } from './entities/flight.entity';
import { PassengersService } from 'src/passengers/passengers.service';

@Injectable()
export class FlightsService {
  constructor(
    @InjectModel(Flight.name)
    private readonly flightModel: Model<Flight>,
    private readonly passengersService: PassengersService,
  ) {}

  async create(createFlightDto: CreateFlightDto): Promise<Flight> {
    const newFlight = await this.flightModel.create(createFlightDto);
    return newFlight;
  }

  async findAll(): Promise<Flight[]> {
    try {
      const flights = await this.flightModel.find().populate('passengers');
      return flights;
    } catch (error) {
      console.log({ error });
    }
  }

  async findOne(id: string): Promise<Flight> {
    const flight = await this.flightModel.findById(id).populate('passengers');
    if (!flight) {
      throw new NotFoundException('The Flight was not found');
    }
    return flight;
  }

  async update(id: string, updateFlightDto: UpdateFlightDto): Promise<Flight> {
    const updatedFlight = await this.flightModel
      .findByIdAndUpdate(id, updateFlightDto, { new: true })
      .populate('passengers');
    if (!updatedFlight) {
      throw new BadRequestException('Flight not found');
    }
    return updatedFlight;
  }

  async remove(id: string): Promise<void> {
    const deletedFlight = await this.flightModel.findByIdAndDelete(id);
    if (!deletedFlight) {
      throw new BadRequestException('Flight not found');
    }
  }

  async addPassenger(id: string, passengerId: string): Promise<Flight> {
    await this.passengersService.findOne(passengerId);
    const updatedFlight = await this.flightModel
      .findByIdAndUpdate(
        id,
        {
          $addToSet: { passengers: passengerId },
        },
        { new: true },
      )
      .populate('passengers');
    if (!updatedFlight) {
      throw new BadRequestException('Flight not found');
    }
    return updatedFlight;
  }
}
