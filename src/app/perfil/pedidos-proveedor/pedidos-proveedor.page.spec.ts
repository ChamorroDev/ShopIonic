import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PedidosProveedorPage } from './pedidos-proveedor.page';

describe('PedidosProveedorPage', () => {
  let component: PedidosProveedorPage;
  let fixture: ComponentFixture<PedidosProveedorPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PedidosProveedorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
