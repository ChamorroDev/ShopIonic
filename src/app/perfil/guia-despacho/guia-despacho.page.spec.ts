import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GuiaDespachoPage } from './guia-despacho.page';

describe('GuiaDespachoPage', () => {
  let component: GuiaDespachoPage;
  let fixture: ComponentFixture<GuiaDespachoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(GuiaDespachoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
