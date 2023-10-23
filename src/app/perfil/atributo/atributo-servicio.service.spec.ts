import { TestBed } from "@angular/core/testing";

import { AtributoServiceService } from "./atributo-servicio.service";

describe('AtributoServiceService',()=>{
  let service: AtributoServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AtributoServiceService);
  });

  it('should be created',()=>{
    expect(service).toBeTruthy();
  })

});
