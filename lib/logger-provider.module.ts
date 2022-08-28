import { LoggerService } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import ecsFormat = require('@elastic/ecs-winston-format');
import {
  ElasticsearchTransport,
  ElasticsearchTransportOptions,
} from 'winston-elasticsearch';

type LoggerProviderOptions = {
  level?: string;
  hasConsole?: boolean;
  esClient?: ElasticsearchTransportOptions;
};

export class LoggerProviderModule {
  static register({
    level = 'info',
    hasConsole = true,
    esClient = {},
  }: LoggerProviderOptions): LoggerService {
    const transportLogger = [];
    let transport: any = new winston.transports.Console({
      format: winston.format.combine(ecsFormat({ convertReqRes: true })),
      level,
    });
    const options: ElasticsearchTransportOptions = {
      level,
      format: winston.format.combine(ecsFormat({ convertReqRes: true })),
      ...esClient,
    };

    if (hasConsole) {
      transportLogger.push(transport);
    }

    if (Object.keys(esClient).length) {
      transport = new ElasticsearchTransport(options);
      transportLogger.push(transport);
    }

    return WinstonModule.createLogger({
      transports: transportLogger,
    });
  }
}
