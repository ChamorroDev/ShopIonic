import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RetiradorPage } from './retirador.page';

describe('RetiradorPage', () => {
  let component: RetiradorPage;
  let fixture: ComponentFixture<RetiradorPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RetiradorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
