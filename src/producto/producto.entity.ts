import {
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  Entity,
} from 'typeorm';
import { Tipo } from './tipo.enum';
import { TiendaEntity } from 'src/tienda/tienda.entity';

@Entity()
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

  @ManyToMany(() => TiendaEntity, (tienda) => tienda.productos)
  @JoinTable()
  tiendas: TiendaEntity[];
}
