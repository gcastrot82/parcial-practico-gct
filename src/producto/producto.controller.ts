import { Controller, UseInterceptors } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';

@Controller('products')
@UseInterceptors(BusinessErrorsInterceptor)
export class ProductoController {
  constructor(private readonly productoService: ProductoService) {}
}
