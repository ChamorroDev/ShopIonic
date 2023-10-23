import { TestBed } from "@angular/core/testing";

import { TarjetaServiceService } from "./tarjetas-servicio.service";

describe('TarjetaServiceService',()=>{
  let service: TarjetaServiceService;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TarjetaServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
