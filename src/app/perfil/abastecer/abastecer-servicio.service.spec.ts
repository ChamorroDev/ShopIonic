import { TestBed } from '@angular/core/testing';

import { AbastecerServicioService } from './abastecer-servicio.service';

describe('AbastecerServicioService', () => {
  let service: AbastecerServicioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AbastecerServicioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
