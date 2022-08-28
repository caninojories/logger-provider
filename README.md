# Intervu.ai Logger Provider

## Description

Intervue.ai Logger Implementation.

## How to used
```
const app = await NestFactory.create(AppModule, {
  logger: LoggerProviderModule.register({
    esClient: {
      clientOpts: {
        node: 'https://localhost:9200',
      }
    }
  })
);
```

## Options
* esClient see [here](https://github.com/vanthome/winston-elasticsearch)
* hasConsole to enable console log of the application (default: true)
