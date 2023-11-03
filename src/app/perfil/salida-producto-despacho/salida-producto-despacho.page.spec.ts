import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SalidaProductoDespachoPage } from './salida-producto-despacho.page';

describe('SalidaProductoDespachoPage', () => {
  let component: SalidaProductoDespachoPage;
  let fixture: ComponentFixture<SalidaProductoDespachoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SalidaProductoDespachoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
