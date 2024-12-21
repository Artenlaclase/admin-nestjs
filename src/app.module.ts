import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
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