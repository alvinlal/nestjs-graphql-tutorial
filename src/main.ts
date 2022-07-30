import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationError } from 'class-validator';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //cors
  app.enableCors({
    origin: true,
    credentials: true,
  });

  // class-validator validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        return new BadRequestException(
          validationErrors.map((error) => {
            delete error.target;
            delete error.children;
            delete error.value;
            return error;
          }),
        );
      },
    }),
  );

  app.use(cookieParser());

  // listen
  await app.listen(8000);
}
bootstrap();
