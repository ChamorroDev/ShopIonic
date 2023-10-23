import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormaPagarPage } from './forma-pagar.page';

describe('FormaPagarPage', () => {
  let component: FormaPagarPage;
  let fixture: ComponentFixture<FormaPagarPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(FormaPagarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
