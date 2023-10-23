import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RregionPage } from './rregion.page';

describe('RregionPage', () => {
  let component: RregionPage;
  let fixture: ComponentFixture<RregionPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RregionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
