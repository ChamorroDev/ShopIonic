import { TestBed } from '@angular/core/testing';

import { ProductoServiceService } from './producto-servicio.service';

describe('PruductoServicioService', () => {
  let service: ProductoServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductoServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
