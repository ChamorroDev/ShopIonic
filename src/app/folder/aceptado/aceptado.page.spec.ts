import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AceptadoPage } from './aceptado.page';

describe('AceptadoPage', () => {
  let component: AceptadoPage;
  let fixture: ComponentFixture<AceptadoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AceptadoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
