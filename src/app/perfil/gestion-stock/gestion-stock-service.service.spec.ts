import { TestBed } from '@angular/core/testing';

import { GestionStockServiceService } from './gestion-stock-service.service';

describe('GestionStockServiceService', () => {
  let service: GestionStockServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestionStockServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
