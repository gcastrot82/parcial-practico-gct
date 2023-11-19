import { Module } from '@nestjs/common';
import { TiendaEntity } from '../tienda/tienda.entity';
import { TiendaService } from '../tienda/tienda.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TiendaProductoController } from './tienda-producto.controller';
import { TiendaProductoService } from './tienda-producto.service';
import { ProductoEntity } from '../producto/producto.entity';
import { ProductoService } from '../producto/producto.service';

@Module({
  imports: [TypeOrmModule.forFeature([TiendaEntity, ProductoEntity])],
  providers: [TiendaService, TiendaProductoService, ProductoService],
  controllers: [TiendaProductoController],
})
export class TiendaProductoModule {}
