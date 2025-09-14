import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // it removes unwanted properties that are not in dto
      forbidNonWhitelisted: true, // it throws error if unwanted properties are present
      transform: true, // it transforms the input data to the desired type (e.g string to number, boolean to string etc))
    }),
  ); // to enable dto validation globally(i.e Global validation Pipe)
}
bootstrap();
