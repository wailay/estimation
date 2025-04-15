import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FgDialogComponent } from './fg-dialog.component';

describe('FgDialogComponent', () => {
  let component: FgDialogComponent;
  let fixture: ComponentFixture<FgDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [FgDialogComponent]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FgDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
