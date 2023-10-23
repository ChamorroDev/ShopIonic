import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MarcaPage } from './marca.page';

describe('MarcaPage', () => {
  let component: MarcaPage;
  let fixture: ComponentFixture<MarcaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MarcaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
