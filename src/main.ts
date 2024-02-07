import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as session from 'express-session';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
// import { getConnection } from 'typeorm';

async function bootstrap() {
  console.log(process.env.DB_PASSWORD_P);
  const app = await NestFactory.create(AppModule);

  app.use(
    session({
      secret: 'regrh534htrh45hrhbt',
      resave: false,
      saveUninitialized: true,
      cookie: { secure: false },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('TestTask')
    .setDescription('This is TestTask')
    .setVersion('1.0')
    .addTag('test-rtask')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.enableCors();

  await app.listen(3000);
  // try {
  //   const connection = getConnection('default');
  //   const isConnected = connection.isConnected;
  //   console.log('Database connection status: ', isConnected);
  // } catch (error) {
  //   console.error('Error while connecting to the database', error);
  // }
}
bootstrap();
