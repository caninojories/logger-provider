import { LoggerService } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import ecsFormat = require('@elastic/ecs-winston-format');
import {
  ElasticsearchTransport,
  ElasticsearchTransportOptions,
} from 'winston-elasticsearch';
import { Client, ClientOptions } from '@elastic/elasticsearch';

type LoggerProviderOptions = {
  level?: string;
  esClient?: ClientOptions;
};

export class LoggerProviderModule {
  static register({
    level = 'info',
    esClient = {},
  }: LoggerProviderOptions): LoggerService {
    const options: ElasticsearchTransportOptions = {
      level,
      format: winston.format.combine(ecsFormat({ convertReqRes: true })),
    };

    if (Object.keys(esClient).length) {
      options.client = new Client(esClient);
    }

    return WinstonModule.createLogger({
      transports: [new ElasticsearchTransport(options)],
    });
  }
}
