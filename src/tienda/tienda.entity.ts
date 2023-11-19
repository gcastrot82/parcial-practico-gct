import { ProductoEntity } from 'src/producto/producto.entity';
import { PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';

export class TiendaEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombre: string;

  @Column()
  ciudad: string;

  @Column()
  direccion: string;

  @ManyToMany(() => ProductoEntity, (producto) => producto.tiendas)
  @JoinTable()
  productos: ProductoEntity[];
}
