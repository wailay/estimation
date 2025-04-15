import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BordereauResourceComponent } from './bordereau-resource.component';

describe('BordereauResourceComponent', () => {
  let component: BordereauResourceComponent;
  let fixture: ComponentFixture<BordereauResourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [BordereauResourceComponent]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BordereauResourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
