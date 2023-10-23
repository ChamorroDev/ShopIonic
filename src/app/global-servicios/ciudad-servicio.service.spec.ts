import { TestBed } from '@angular/core/testing';

import { CiudadServicioService } from './ciudad-servicio.service';

describe('CiudadServicioService', () => {
  let service: CiudadServicioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CiudadServicioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
