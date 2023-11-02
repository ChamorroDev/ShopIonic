import { TestBed } from '@angular/core/testing';

import { PedidosProveedorServicioService } from './pedidos-proveedor-servicio.service';

describe('PedidosProveedorServicioService', () => {
  let service: PedidosProveedorServicioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PedidosProveedorServicioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
