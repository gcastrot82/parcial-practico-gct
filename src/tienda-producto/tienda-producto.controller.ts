import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { TiendaProductoService } from './tienda-producto.service';
import { TiendaDto } from '../tienda/tienda.dto';
import { TiendaEntity } from '../tienda/tienda.entity';
import { plainToInstance } from 'class-transformer';

@Controller('products')
@UseInterceptors(BusinessErrorsInterceptor)
export class TiendaProductoController {
  constructor(private readonly tiendaProductoService: TiendaProductoService) {}

  @Post(':productoId/stores/:tiendaId')
  async addStoreToProduct(
    @Param('productoId') productoId: string,
    @Param('tiendaId') tiendaId: string,
  ) {
    return await this.tiendaProductoService.addStoreToProduct(
      productoId,
      tiendaId,
    );
  }

  @Get(':productoId/stores')
  async findStoresFromProduct(@Param('productoId') productoId: string) {
    return await this.tiendaProductoService.findStoresFromProduct(productoId);
  }

  @Get(':productoId/stores/:tiendaId')
  async findStoreFromProduct(
    @Param('productoId') productoId: string,
    @Param('tiendaId') tiendaId: string,
  ) {
    return await this.tiendaProductoService.findStoreFromProduct(
      productoId,
      tiendaId,
    );
  }
  @Put(':productoId/stores')
  async updateStoresFromProduct(
    @Body() tiendaDto: TiendaDto[],
    @Param('productoId') productoId: string,
  ) {
    const tiendas = plainToInstance(TiendaEntity, tiendaDto);
    return await this.tiendaProductoService.updateStoresFromProduct(
      productoId,
      tiendas,
    );
  }
  @Delete(':productoId/stores/:tiendaId')
  @HttpCode(204)
  // eslint-disable-next-line prettier/prettier
  async deleteStoresFromProduct(@Param('productoId') productoId: string, @Param('tiendaId') tiendaId: string){                               
    return await this.tiendaProductoService.deleteStoresFromProduct(
      productoId,
      tiendaId,
    );
  }
}
