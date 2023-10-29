import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalleFacturaPage } from './detalle-factura.page';

describe('DetalleFacturaPage', () => {
  let component: DetalleFacturaPage;
  let fixture: ComponentFixture<DetalleFacturaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DetalleFacturaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
