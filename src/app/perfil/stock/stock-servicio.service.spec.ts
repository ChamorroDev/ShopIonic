import { TestBed } from '@angular/core/testing';

import { StockServicioService } from './stock-servicio.service';

describe('StockServicioService', () => {
  let service: StockServicioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StockServicioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
