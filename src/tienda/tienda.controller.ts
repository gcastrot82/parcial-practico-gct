import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { TiendaService } from './tienda.service';

@Controller('stores')
@UseInterceptors(BusinessErrorsInterceptor)
export class TiendaController {
  constructor(private readonly tiendaService: TiendaService) {}
  @Get()
  async findAll() {
    return await this.tiendaService.findAll();
  }
}
