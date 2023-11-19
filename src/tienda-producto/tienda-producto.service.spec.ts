import { Test, TestingModule } from '@nestjs/testing';
import { TiendaProductoService } from './tienda-producto.service';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';

describe('TiendaProductoService', () => {
  let service: TiendaProductoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [TiendaProductoService],
    }).compile();

    service = module.get<TiendaProductoService>(TiendaProductoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
