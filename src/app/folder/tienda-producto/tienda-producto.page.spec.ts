import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TiendaProductoPage } from './tienda-producto.page';

describe('TiendaProductoPage', () => {
  let component: TiendaProductoPage;
  let fixture: ComponentFixture<TiendaProductoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TiendaProductoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
