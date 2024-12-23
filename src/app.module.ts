import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,  // Esto hace que las variables de entorno estén disponibles globalmente
      envFilePath: '.env',  // Este es el archivo donde se leen las variables
    }),
    
    TypeOrmModule.forRoot({
      type: 'sqlite', // Cambia esto según tu base de datos (MySQL, PostgreSQL, etc.)
      database: 'db.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // No usar en producción, genera las tablas automáticamente
    }),
    UsersModule,
  ],
})
export class AppModule {}