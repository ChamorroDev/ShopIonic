import { TestBed } from '@angular/core/testing';

import { RegionServicioService } from './region-servicio.service';

describe('RegionServicioService', () => {
  let service: RegionServicioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegionServicioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
