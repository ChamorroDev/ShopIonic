import { TestBed } from '@angular/core/testing';

import { CarroServicioService } from './carro-servicio.service';

describe('CarroServicioService', () => {
  let service: CarroServicioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarroServicioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
