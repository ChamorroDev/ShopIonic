import { TestBed } from '@angular/core/testing';

import { RregionServicioService } from './rregion-servicio.service';

describe('RregionServicioService', () => {
  let service: RregionServicioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RregionServicioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
