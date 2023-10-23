import { TestBed } from '@angular/core/testing';

import { DireccionServicioService } from './direccion-servicio.service';

describe('DireccionServicioService', () => {
  let service: DireccionServicioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DireccionServicioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
