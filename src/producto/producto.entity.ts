import { PrimaryGeneratedColumn, Column } from 'typeorm';
import { Tipo } from './tipo.enum';

export class ProductoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombre: string;

  @Column()
  precio: number;

  @Column({
    type: 'enum',
    enum: Tipo,
  })
  tipo: Tipo;
}
