import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GenerarOrdenPage } from './generar-orden.page';

describe('GenerarOrdenPage', () => {
  let component: GenerarOrdenPage;
  let fixture: ComponentFixture<GenerarOrdenPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(GenerarOrdenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
