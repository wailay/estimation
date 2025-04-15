import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceDialogComponent } from './resource-dialog.component';

describe('ResourceDialogComponent', () => {
  let component: ResourceDialogComponent;
  let fixture: ComponentFixture<ResourceDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [ResourceDialogComponent]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
