import { TestBed } from '@angular/core/testing';

import { SucursalServicioService } from './sucursal-servicio.service';

describe('SucursalServicioService', () => {
  let service: SucursalServicioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SucursalServicioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
