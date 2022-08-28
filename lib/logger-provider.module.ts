import { LoggerService } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import ecsFormat = require('@elastic/ecs-winston-format');
import {
  ElasticsearchTransport,
  ElasticsearchTransportOptions,
} from 'winston-elasticsearch';
import { ClientOptions } from '@elastic/elasticsearch';

type LoggerProviderOptions = {
  level?: string;
  esClient?: ClientOptions;
};

export class LoggerProviderModule {
  static register({
    level = 'info',
    esClient = {},
  }: LoggerProviderOptions): LoggerService {
    let transport: any = new winston.transports.Console({
      format: winston.format.combine(ecsFormat({ convertReqRes: true })),
      level,
    });
    const options: ElasticsearchTransportOptions = {
      level,
      format: winston.format.combine(ecsFormat({ convertReqRes: true })),
      clientOpts: { node: 'http://localhost:9200' },
    };

    if (Object.keys(esClient).length) {
      transport = new ElasticsearchTransport(options);
    }

    return WinstonModule.createLogger({
      transports: [transport],
    });
  }
}
