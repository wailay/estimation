import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkforceTableComponent } from './workforce-table.component';

describe('WorkforceTableComponent', () => {
  let component: WorkforceTableComponent;
  let fixture: ComponentFixture<WorkforceTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkforceTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkforceTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
