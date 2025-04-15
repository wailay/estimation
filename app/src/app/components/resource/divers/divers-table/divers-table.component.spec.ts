import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiversTableComponent } from './divers-table.component';

describe('DiversTableComponent', () => {
  let component: DiversTableComponent;
  let fixture: ComponentFixture<DiversTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [DiversTableComponent]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiversTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
