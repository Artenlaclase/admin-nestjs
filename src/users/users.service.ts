import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create.user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { MailerService } from '../mailer/mailer.service';
import { generateResetToken } from './utils/token-utils';
import { EncryptionService } from '../common/encryption/encryption.service';
import { log } from 'console';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly mailerService: MailerService,
    private readonly encryptionService: EncryptionService,
  ) { }

  async createUser(createUserDto: CreateUserDto) {
    const { rut, correo, nombre, rol } = createUserDto;

    // Validar unicidad del Rut
    const existingRut = await this.userRepository.findOne({ where: { rut } });
    if (existingRut) {
      throw new ConflictException('El Rut ya está registrado.');
    }

    // Validar unicidad del correo
    const existingCorreo = await this.userRepository.findOne({ where: { correo } });
    if (existingCorreo) {
      throw new ConflictException('El correo electrónico ya está registrado.');
    }

    // Generar contraseña aleatoria
    const rawPassword = this.generateRandomPassword();
    const resetToken = generateResetToken();

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(rawPassword, 10);
    // Cifrar el RUT y el correo electrónico
    const encryptedRut = this.encryptionService.encrypt(rut);
    const encryptedCorreo = this.encryptionService.encrypt(correo);

    // Crear y guardar el usuario
    const user = this.userRepository.create({
      rut: encryptedRut,
      nombre,
      correo: encryptedCorreo,
      rol,
      password: hashedPassword,
    });

    const savedUser = await this.userRepository.save(user);

    //  // Enviar correo con credenciales
    //  const resetUrl = `https://miapp.com/reset-password?token=${resetToken}`;
    //  const emailHtml = `
    //    <h1>Bienvenido, ${nombre}!</h1>
    //    <p>Estas son tus credenciales iniciales:</p>
    //    <p>Contraseña: ${rawPassword}</p>
    //    <p><a href="${resetUrl}">Haz clic aquí para cambiar tu contraseña.</a></p>
    //  `;

    //  await this.mailerService.sendMail(correo, 'Bienvenido a la aplicación', emailHtml);

    console.log(`Usuario creado con contraseña: ${rawPassword}`);
    console.log(encryptedRut, encryptedCorreo);// Ver el RUT y correo cifrados en la consola
    return savedUser;
  }


  getAllUsers() {
    return this.userRepository.find();

  }

  private generateRandomPassword(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*!';
    return Array(6)
      .fill(null)
      .map(() => chars.charAt(Math.floor(Math.random() * chars.length)))
      .join('');
  }
}