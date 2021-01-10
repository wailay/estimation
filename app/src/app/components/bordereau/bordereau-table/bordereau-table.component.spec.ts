import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BordereauTableComponent } from './bordereau-table.component';

describe('BordereauTableComponent', () => {
  let component: BordereauTableComponent;
  let fixture: ComponentFixture<BordereauTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BordereauTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BordereauTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
