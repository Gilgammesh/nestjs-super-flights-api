import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, IsDate } from 'class-validator';

export class CreateFlightDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  pilot: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  airplane: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  destinationCity: string;

  @ApiProperty()
  @Type(() => Date)
  @IsDate()
  flightDate: Date;
}
