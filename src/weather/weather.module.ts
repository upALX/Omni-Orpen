import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WeatherController } from './weather.controller';
import { WeatherResource } from './weather.resource';
import { WeatherRepository } from './weather.repository';
import { WeatherModel } from './model/weather.model';

@Module({
    imports: [TypeOrmModule.forFeature([WeatherModel])],
    controllers: [WeatherResource],
    providers: [WeatherModel, WeatherController, WeatherRepository],
})
export class WeatherModule {}
