import { Module } from '@nestjs/common';
import { TiendaEntity } from 'src/tienda/tienda.entity';
import { TiendaService } from 'src/tienda/tienda.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([TiendaEntity])],
  providers: [TiendaService],
})
export class TiendaProductoModule {}
