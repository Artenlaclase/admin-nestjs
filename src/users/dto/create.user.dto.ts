import { IsNotEmpty, IsEmail, IsEnum } from 'class-validator';
import { Transform } from 'class-transformer';


export class CreateUserDto {
  @IsNotEmpty({ message: 'El Rut es obligatorio.' })
  @Transform(({ value }) => formatRut(value), { toClassOnly: true })
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

function formatRut(rut: string): string {

  let cleanRut = rut.replace(/[^0-9kK]+/g, '');
  
  return `${cleanRut.slice(0, -8)}.${cleanRut.slice(-8, -5)}.${cleanRut.slice(-5, -1)}-${cleanRut.slice(-1)}`;


}