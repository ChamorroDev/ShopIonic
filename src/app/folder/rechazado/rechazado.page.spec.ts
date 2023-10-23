import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RechazadoPage } from './rechazado.page';

describe('RechazadoPage', () => {
  let component: RechazadoPage;
  let fixture: ComponentFixture<RechazadoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RechazadoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
