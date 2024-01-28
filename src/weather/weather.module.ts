import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WeatherController } from './controller/weather.controller';
import { WeatherResource } from './weather.resource';
import { WebhookRepository } from './repository/webhook.repository';
import { WeatherRepository } from './repository/weather.repository';
import { WeatherModel } from './model/weather.model';
import { WebhookModel } from './model/webhook.model';
import { WebhookController } from './controller/webhook.controller';

@Module({
    imports: [TypeOrmModule.forFeature([WeatherModel, WebhookModel])],
    controllers: [WeatherResource],
    providers: [WeatherModel, WebhookModel, WeatherController, WebhookController, WeatherRepository, WebhookRepository],
})
export class WeatherModule {}
