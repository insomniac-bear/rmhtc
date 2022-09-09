import { NestFactory } from '@nestjs/core';
import { ForbiddenException, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

const allowedDomains = [
  'http://10.16.10.1:3002/',
  'http://10.16.10.1:3002',
  'http://10.16.10.1:3001/',
  'http://10.16.10.1:3001',
  'http://localhost:3000/',
  'http://localhost:3000',
  'http://localhost:8000',
  'http://localhost:8000/',
  'https://localhost:8000',
  'https://localhost:8000/',
];

async function bootstrap() {
  const PORT = process.env.API_LOCAL_PORT || 8000;
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: (origin, cb) => {
      if (!allowedDomains.includes(origin)) {
        return cb(new ForbiddenException('Access Denied! CORS POLICY'), false);
      }
      return cb(null, true);
    },
    methods: 'GET, HEAD, POST, PUT, PATCH, DELETE, OPTIONS',
    credentials: true,
  });
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      skipNullProperties: true,
      skipUndefinedProperties: true,
    })
  );

  const config = new DocumentBuilder()
    .setTitle('ITC')
    .setDescription('API Documentation')
    .setVersion('0.0.1')
    .addTag('ADD')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/v1/docs', app, document);
  app.setGlobalPrefix('api/v1');
  await app.listen(PORT, () => console.log(`Server started on ${PORT} port`));
}
bootstrap();
