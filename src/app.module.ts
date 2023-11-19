import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductoModule } from './producto/producto.module';
import { TiendaModule } from './tienda/tienda.module';
import { ProductoEntity } from './producto/producto.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TiendaEntity } from './tienda/tienda.entity';

@Module({
  imports: [
    ProductoModule,
    TiendaModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'BDparcialPracticoGct',
      entities: [ProductoEntity, TiendaEntity],
      dropSchema: true,
      synchronize: true,
      keepConnectionAlive: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
