import {
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';

export class ProductoDto {
  @IsString()
  @IsNotEmpty()
  readonly nombre: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly precio: number;

  @IsNotEmpty()
  @IsIn(['Perecedero', 'No perecedero'], {
    message: 'El tipo de producto debe ser [Perecedero] o [No perecedero].',
  })
  readonly tipo: string;
}
