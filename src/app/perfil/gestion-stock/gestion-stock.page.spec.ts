import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GestionStockPage } from './gestion-stock.page';

describe('GestionStockPage', () => {
  let component: GestionStockPage;
  let fixture: ComponentFixture<GestionStockPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(GestionStockPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
