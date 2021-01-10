import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamDetailTableComponent } from './team-detail-table.component';

describe('TeamDetailTableComponent', () => {
  let component: TeamDetailTableComponent;
  let fixture: ComponentFixture<TeamDetailTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamDetailTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamDetailTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
