import { Injectable, ConflictException } from '@nestjs/common';
import{InjectRepository} from '@nestjs/typeorm'
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create.user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

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

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(rawPassword, 10);

    // Crear y guardar el usuario
    const user = this.userRepository.create({
      rut,
      nombre,
      correo,
      rol,
      password: hashedPassword,
    });

    const savedUser = await this.userRepository.save(user);

    // Aquí enviarías el correo con las credenciales iniciales (opcional)
    console.log(`Contraseña generada: ${rawPassword}`);

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