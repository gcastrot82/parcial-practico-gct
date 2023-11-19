import { Module } from '@nestjs/common';
import { TiendaEntity } from 'src/tienda/tienda.entity';
import { TiendaService } from 'src/tienda/tienda.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TiendaProductoController } from './tienda-producto.controller';
import { TiendaProductoService } from './tienda-producto.service';
import { ProductoEntity } from 'src/producto/producto.entity';
import { ProductoService } from 'src/producto/producto.service';

@Module({
  imports: [TypeOrmModule.forFeature([TiendaEntity, ProductoEntity])],
  providers: [TiendaService, TiendaProductoService, ProductoService],
  controllers: [TiendaProductoController],
})
export class TiendaProductoModule {}
