import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const PORT = process.env.PORT || 8000;
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

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
