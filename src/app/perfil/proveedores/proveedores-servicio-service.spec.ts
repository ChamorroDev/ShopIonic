import { TestBed } from "@angular/core/testing";
import { ProveedorServiceService } from "./proveedores-servicio.service";



describe('ProveedorServiceService ',()=>{
  let service:ProveedorServiceService ;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProveedorServiceService );
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});