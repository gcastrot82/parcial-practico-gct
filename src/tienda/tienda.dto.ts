import { IsString, IsNotEmpty, Length } from 'class-validator';

export class TiendaDto {
  @IsString()
  @IsNotEmpty()
  readonly nombre: string;

  @IsString()
  @IsNotEmpty()
  @Length(3, 3, { message: 'La ciudad debe tener tres caracteres.' })
  readonly ciudad: string;

  @IsString()
  @IsNotEmpty()
  readonly direccion: [];
}
