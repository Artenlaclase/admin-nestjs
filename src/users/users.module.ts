import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { MailerModule } from '../mailer/mailer.module';
import { EncryptionService } from '../common/encryption/encryption.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]),
  MailerModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, EncryptionService]
})
export class UsersModule {}