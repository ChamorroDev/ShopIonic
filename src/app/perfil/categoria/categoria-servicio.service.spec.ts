import { TestBed } from '@angular/core/testing';

import { CategoryServiceService } from './categoria-servicio.service';

describe('CategoryServiceService', () => {
  let service: CategoryServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoryServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
