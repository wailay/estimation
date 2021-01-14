import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamLookupComponent } from './team-lookup.component';

describe('TeamLookupComponent', () => {
  let component: TeamLookupComponent;
  let fixture: ComponentFixture<TeamLookupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamLookupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
