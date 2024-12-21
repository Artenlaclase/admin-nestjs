import { IsNotEmpty, IsEmail, IsEnum } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'El Rut es obligatorio.' })
  rut: string;

  @IsNotEmpty({ message: 'El nombre es obligatorio.' })
  nombre: string;

  @IsEmail({}, { message: 'Debe proporcionar un correo electrónico válido.' })
  @IsNotEmpty({ message: 'El correo electrónico es obligatorio.' })
  correo: string;

  @IsEnum(['abogado', 'asesor'], { message: 'El rol debe ser abogado o asesor.' })
  @IsNotEmpty({ message: 'El rol es obligatorio.' })
  rol: string;
}