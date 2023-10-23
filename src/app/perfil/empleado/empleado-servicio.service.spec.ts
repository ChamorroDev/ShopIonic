import { TestBed } from '@angular/core/testing';

import { EmpleadoServicioService } from './empleado-servicio.service';

describe('EmpleadoServicioService', () => {
  let service: EmpleadoServicioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmpleadoServicioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
