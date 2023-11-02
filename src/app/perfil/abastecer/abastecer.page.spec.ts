import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AbastecerPage } from './abastecer.page';

describe('AbastecerPage', () => {
  let component: AbastecerPage;
  let fixture: ComponentFixture<AbastecerPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AbastecerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
