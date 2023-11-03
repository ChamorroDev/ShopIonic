import { TestBed } from '@angular/core/testing';

import { SalidaServicioService } from './salida-servicio.service';

describe('SalidaServicioService', () => {
  let service: SalidaServicioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalidaServicioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
