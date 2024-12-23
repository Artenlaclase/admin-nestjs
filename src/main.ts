import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
  console.log('Length of IV:', Buffer.from('vector_inicia_12', 'utf8').length);
  console.log('AES_IV:', process.env.AES_IV);
  console.log('Length of AES_KEY:', Buffer.from('clave_secreta_32_caracteres_1234', 'utf8').length);
 

}
bootstrap();
dotenv.config();