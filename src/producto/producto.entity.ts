import {
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  Entity,
} from 'typeorm';
import { TiendaEntity } from '../tienda/tienda.entity';

@Entity()
export class ProductoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombre: string;

  @Column()
  precio: number;

  // @Column({
  //   type: 'enum',
  //   enum: Tipo,
  // })
  @Column()
  tipo: string;

  @ManyToMany(() => TiendaEntity, (tienda) => tienda.productos)
  @JoinTable()
  tiendas: TiendaEntity[];
}
