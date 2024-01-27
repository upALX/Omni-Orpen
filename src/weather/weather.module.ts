import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WeatherController } from './weather.controller';
import { WeatherResource } from './weather.resource';
import { WeatherRepository } from './weather.repository';
import { WeatherModel } from './model/weather.model';
import { WebhooksModel } from './model/webhooks.model';

@Module({
    imports: [TypeOrmModule.forFeature([WeatherModel, WebhooksModel])],
    controllers: [WeatherResource],
    providers: [WeatherModel, WebhooksModel, WeatherController, WeatherRepository],
})
export class WeatherModule {}
