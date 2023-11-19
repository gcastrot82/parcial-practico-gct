import { Test, TestingModule } from '@nestjs/testing';
import { ProductoService } from './producto.service';
import { ProductoEntity } from './producto.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { Repository } from 'typeorm';
import { faker } from '@faker-js/faker';

describe('ProductoService', () => {
  let service: ProductoService;
  let repository: Repository<ProductoEntity>;
  let productoList: ProductoEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [ProductoService],
    }).compile();

    service = module.get<ProductoService>(ProductoService);
    repository = module.get<Repository<ProductoEntity>>(
      getRepositoryToken(ProductoEntity),
    );
    await seedDatabase();
  });
  const seedDatabase = async () => {
    repository.clear();
    productoList = [];
    for (let i = 0; i < 5; i++) {
      const producto: ProductoEntity = await repository.save({
        nombre: faker.word.adjective(),
        precio: faker.number.int(),
        tipo: 'perecedero',
      });
      productoList.push(producto);
    }
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll retorna todos los productos', async () => {
    const productos: ProductoEntity[] = await service.findAll();
    expect(productos).not.toBeNull();
    expect(productos).toHaveLength(productoList.length);
  });

  it('findOne should return a producto by id', async () => {
    const storedProducto: ProductoEntity = productoList[0];
    const producto: ProductoEntity = await service.findOne(storedProducto.id);
    expect(producto).not.toBeNull();
    expect(producto.nombre).toEqual(storedProducto.nombre);
    expect(producto.precio).toEqual(storedProducto.precio);
    expect(producto.tipo).toEqual(storedProducto.tipo);
  });

  it('findOne should throw an exception for an invalid producto', async () => {
    await expect(() => service.findOne('0')).rejects.toHaveProperty(
      'message',
      'El producto ingresado no fue encontrado',
    );
  });
  it('create should return a new producto', async () => {
    const producto: ProductoEntity = {
      id: '',
      nombre: faker.company.name(),
      precio: faker.number.int(),
      tipo: 'perecedero',
      tiendas: [],
    };

    const newProducto: ProductoEntity = await service.create(producto);
    expect(newProducto).not.toBeNull();

    const storedProducto: ProductoEntity = await repository.findOne({
      where: { id: newProducto.id },
    });
    expect(storedProducto).not.toBeNull();
    expect(storedProducto.nombre).toEqual(newProducto.nombre);
    expect(storedProducto.precio).toEqual(newProducto.precio);
    expect(storedProducto.tipo).toEqual(newProducto.tipo);
  });

  it('update should modify a producto', async () => {
    const producto: ProductoEntity = productoList[0];
    producto.nombre = faker.company.name();
    producto.precio = faker.number.int();
    const updatedProducto: ProductoEntity = await service.update(
      producto.id,
      producto,
    );
    expect(updatedProducto).not.toBeNull();
    const storedMuseum: ProductoEntity = await repository.findOne({
      where: { id: producto.id },
    });
    expect(storedMuseum).not.toBeNull();
    expect(storedMuseum.nombre).toEqual(producto.nombre);
    expect(storedMuseum.precio).toEqual(producto.precio);
  });
  it('update should throw an exception for an invalid producto', async () => {
    let producto: ProductoEntity = productoList[0];
    producto = {
      ...producto,
      nombre: 'New name',
      precio: -500,
    };
    await expect(() => service.update('0', producto)).rejects.toHaveProperty(
      'message',
      'El producto ingresado no fue encontrado',
    );
  });

  it('delete should remove a producto', async () => {
    const producto: ProductoEntity = productoList[0];
    await service.delete(producto.id);
    const deletedProducto: ProductoEntity = await repository.findOne({
      where: { id: producto.id },
    });
    expect(deletedProducto).toBeNull();
  });
  it('delete should throw an exception for an invalid producto', async () => {
    await expect(() => service.delete('0')).rejects.toHaveProperty(
      'message',
      'El producto ingresado no fue encontrado',
    );
  });
});
