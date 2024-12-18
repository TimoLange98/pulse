import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { CamelCaseInterceptor } from './interceptors/CamelCaseInterceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const corsOptions: CorsOptions = {
    origin: 'http://localhost:4200',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true
  };

  app.useGlobalInterceptors(new CamelCaseInterceptor())

  app.enableCors(corsOptions);

  await app.listen(3000);
}
bootstrap();
