import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EntradaProductoPage } from './entrada-producto.page';

describe('EntradaProductoPage', () => {
  let component: EntradaProductoPage;
  let fixture: ComponentFixture<EntradaProductoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EntradaProductoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
