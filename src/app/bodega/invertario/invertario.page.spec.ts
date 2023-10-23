import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InvertarioPage } from './invertario.page';

describe('InvertarioPage', () => {
  let component: InvertarioPage;
  let fixture: ComponentFixture<InvertarioPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(InvertarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
