import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BordereauResourceTableComponent } from './bordereau-resource-table.component';

describe('BordereauResourceTableComponent', () => {
  let component: BordereauResourceTableComponent;
  let fixture: ComponentFixture<BordereauResourceTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [BordereauResourceTableComponent]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BordereauResourceTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
