import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CargoPage } from './cargo.page';

describe('CargoPage', () => {
  let component: CargoPage;
  let fixture: ComponentFixture<CargoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CargoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
