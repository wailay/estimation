import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VracTableComponent } from './vrac-table.component';

describe('VracTableComponent', () => {
  let component: VracTableComponent;
  let fixture: ComponentFixture<VracTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [VracTableComponent]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VracTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
