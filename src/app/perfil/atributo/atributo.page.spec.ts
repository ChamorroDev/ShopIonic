import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AtributoPage } from './atributo.page';

describe('AtributoPage', () => {
  let component: AtributoPage;
  let fixture: ComponentFixture<AtributoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AtributoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
