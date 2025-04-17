import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MasPage } from './mas.page';

describe('MasPage', () => {
  let component: MasPage;
  let fixture: ComponentFixture<MasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
