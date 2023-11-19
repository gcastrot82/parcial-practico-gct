import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class ProductoDto {
  @IsString()
  @IsNotEmpty()
  readonly nombre: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly precio: number;

  @IsNotEmpty()
  readonly tipo: string;
}
