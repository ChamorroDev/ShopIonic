import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GeneroPage } from './genero.page';

describe('GeneroPage', () => {
  let component: GeneroPage;
  let fixture: ComponentFixture<GeneroPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(GeneroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
