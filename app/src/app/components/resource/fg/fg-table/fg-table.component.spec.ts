import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FgTableComponent } from './fg-table.component';

describe('FgTableComponent', () => {
  let component: FgTableComponent;
  let fixture: ComponentFixture<FgTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [FgTableComponent]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FgTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
