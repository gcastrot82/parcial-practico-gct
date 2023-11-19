import { Test, TestingModule } from '@nestjs/testing';
import { TiendaProductoService } from './tienda-producto.service';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { ProductoEntity } from '../producto/producto.entity';
import { TiendaEntity } from '../tienda/tienda.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';

describe('TiendaProductoService', () => {
  let service: TiendaProductoService;
  let productoRepository: Repository<ProductoEntity>;
  let tiendaRepository: Repository<TiendaEntity>;
  let producto: ProductoEntity;
  let tiendasList: TiendaEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [TiendaProductoService],
    }).compile();

    service = module.get<TiendaProductoService>(TiendaProductoService);
    productoRepository = module.get<Repository<ProductoEntity>>(
      getRepositoryToken(ProductoEntity),
    );
    tiendaRepository = module.get<Repository<TiendaEntity>>(
      getRepositoryToken(TiendaEntity),
    );

    await seedDatabase();
  });

  const seedDatabase = async () => {
    tiendaRepository.clear();
    productoRepository.clear();

    tiendasList = [];
    for (let i = 0; i < 5; i++) {
      const tienda: TiendaEntity = await tiendaRepository.save({
        nombre: faker.company.name(),
        ciudad: faker.location.city(),
        direccion: faker.location.streetAddress(),
      });
      tiendasList.push(tienda);
    }

    producto = await productoRepository.save({
      nombre: faker.company.name(),
      precio: faker.number.int(),
      tipo: 'perecedero',
      tiendas: tiendasList,
    });
  };

  // it('addTiendaToProduct should add an tienda to a producto', async () => {
  //   const newTienda: TiendaEntity = await tiendaRepository.save({
  //     nombre: faker.company.name(),
  //     ciudad: faker.location.city(),
  //     direccion: faker.location.streetAddress(),
  //   });

  //   const newProducto: ProductoEntity = await productoRepository.save({
  //     nombre: faker.company.name(),
  //     precio: faker.number.int(),
  //     tipo: 'no-perecedero',
  //   });

  //   const result: ProductoEntity = await service.addStoreToProduct(
  //     newProducto.id,
  //     newTienda.id,
  //   );

  //   expect(result.tiendas.length).toBe(1);
  //   expect(result.tiendas[0]).not.toBeNull();
  //   expect(result.tiendas[0].nombre).toBe(newTienda.nombre);
  //   expect(result.tiendas[0].direccion).toBe(newTienda.direccion);
  //   expect(result.tiendas[0].ciudad).toBe(newTienda.ciudad);
  // });

  // it('addTiendaToProduct should thrown exception for an invalid tienda', async () => {
  //   const newProducto: ProductoEntity = await productoRepository.save({
  //     nombre: faker.company.name(),
  //     precio: faker.number.int(),
  //   });

  //   await expect(() =>
  //     service.addStoreToProduct(newProducto.id, '0'),
  //   ).rejects.toHaveProperty(
  //     'message',
  //     'La tienda con el id dado no fue encontrado',
  //   );
  // });

  // it('addTiendaToProduct should throw an exception for an invalid producto', async () => {
  //   const newTienda: TiendaEntity = await tiendaRepository.save({
  //     nombre: faker.company.name(),
  //     ciudad: faker.location.city(),
  //     direccion: faker.location.streetAddress(),
  //   });

  //   await expect(() =>
  //     service.addStoreToProduct('0', newTienda.id),
  //   ).rejects.toHaveProperty(
  //     'message',
  //     'El producto con el id dado no fue encontrado',
  //   );
  // });

  it('findStoreFromProduct should return tienda by producto', async () => {
    const tienda: TiendaEntity = tiendasList[0];
    const storedTienda: TiendaEntity = await service.findStoreFromProduct(
      producto.id,
      tienda.id,
    );
    expect(storedTienda).not.toBeNull();
    expect(storedTienda.nombre).toBe(tienda.nombre);
    expect(storedTienda.ciudad).toBe(tienda.ciudad);
    expect(storedTienda.direccion).toBe(tienda.direccion);
  });

  it('findStoreFromProduct should throw an exception for an invalid tienda', async () => {
    await expect(() =>
      service.findStoreFromProduct(producto.id, '0'),
    ).rejects.toHaveProperty(
      'message',
      'La tienda con el id dado no fue encontrado',
    );
  });

  it('findStoreFromProduct should throw an exception for an invalid producto', async () => {
    const tienda: TiendaEntity = tiendasList[0];
    await expect(() =>
      service.findStoreFromProduct('0', tienda.id),
    ).rejects.toHaveProperty(
      'message',
      'El producto con el id dado no fue encontrado',
    );
  });

  it('findStoreFromProduct should throw an exception for an tienda not associated to the producto', async () => {
    const newTienda: TiendaEntity = await tiendaRepository.save({
      nombre: faker.company.name(),
      ciudad: faker.location.city(),
      direccion: faker.location.streetAddress(),
    });
    await expect(() =>
      service.findStoreFromProduct(producto.id, newTienda.id),
    ).rejects.toHaveProperty(
      'message',
      'La tienda no esta asociada al producto',
    );
  });

  it('findStoresFromProduct should return tiendas by producto', async () => {
    const tiendas: TiendaEntity[] = await service.findStoresFromProduct(
      producto.id,
    );
    expect(tiendas.length).toBe(5);
  });

  it('findStoresFromProduct should throw an exception for an invalid producto', async () => {
    await expect(() =>
      service.findStoresFromProduct('0'),
    ).rejects.toHaveProperty(
      'message',
      'Las tiendas con el producto id no fueron encontradas',
    );
  });

  it('updateStoresFromProduct should update tiendas list for a producto', async () => {
    const newTienda: TiendaEntity = await tiendaRepository.save({
      nombre: faker.company.name(),
      ciudad: faker.location.city(),
      direccion: faker.location.streetAddress(),
    });

    const updatedProducto: ProductoEntity =
      await service.updateStoresFromProduct(producto.id, [newTienda]);
    expect(updatedProducto.tiendas.length).toBe(1);

    expect(updatedProducto.tiendas[0].nombre).toBe(newTienda.nombre);
    expect(updatedProducto.tiendas[0].ciudad).toBe(newTienda.ciudad);
    expect(updatedProducto.tiendas[0].direccion).toBe(newTienda.direccion);
  });

  it('updateStoresFromProduct should throw an exception for an invalid producto', async () => {
    const newTienda: TiendaEntity = await tiendaRepository.save({
      nombre: faker.company.name(),
      ciudad: faker.location.city(),
      direccion: faker.location.streetAddress(),
    });

    await expect(() =>
      service.updateStoresFromProduct('0', [newTienda]),
    ).rejects.toHaveProperty(
      'message',
      'El producto con el id dado no fue encontrado',
    );
  });

  it('addStoreToProduct should throw an exception for an invalid tienda', async () => {
    const newTienda: TiendaEntity = tiendasList[0];
    newTienda.id = '0';

    await expect(() =>
      service.addStoreToProduct(producto.id, newTienda.id),
    ).rejects.toHaveProperty(
      'message',
      'La tienda con el id dado no fue encontrado',
    );
  });

  it('deleteStoresFromProduct should remove an tienda from a producto', async () => {
    const tienda: TiendaEntity = tiendasList[0];

    await service.deleteStoresFromProduct(producto.id, tienda.id);

    const storedProducto: ProductoEntity = await productoRepository.findOne({
      where: { id: producto.id },
      relations: ['tiendas'],
    });
    const deletedTienda: TiendaEntity = storedProducto.tiendas.find(
      (a) => a.id === tienda.id,
    );

    expect(deletedTienda).toBeUndefined();
  });

  it('deleteStoresFromProduct should thrown an exception for an invalid artwork', async () => {
    await expect(() =>
      service.deleteStoresFromProduct(producto.id, '0'),
    ).rejects.toHaveProperty(
      'message',
      'La tienda con el id dado no fue encontrado',
    );
  });

  it('deleteStoresFromProduct should thrown an exception for an invalid producto', async () => {
    const tienda: TiendaEntity = tiendasList[0];
    await expect(() =>
      service.deleteStoresFromProduct('0', tienda.id),
    ).rejects.toHaveProperty('message', 'La tienda no tiene producto asociado');
  });

  it('deleteStoresFromProduct should thrown an exception for an non asocciated artwork', async () => {
    const newTienda: TiendaEntity = await tiendaRepository.save({
      nombre: faker.company.name(),
      ciudad: faker.location.city(),
      direccion: faker.location.streetAddress(),
    });

    await expect(() =>
      service.deleteStoresFromProduct(producto.id, newTienda.id),
    ).rejects.toHaveProperty(
      'message',
      'El producto no esta asociada a la tienda',
    );
  });
});
