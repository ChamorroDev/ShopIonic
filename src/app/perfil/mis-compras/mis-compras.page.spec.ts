import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MisComprasPage } from './mis-compras.page';

describe('MisComrpasPage', () => {
  let component: MisComprasPage;
  let fixture: ComponentFixture<MisComprasPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MisComprasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
