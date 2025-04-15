import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipementTableComponent } from './equipement-table.component';

describe('EquipementTableComponent', () => {
  let component: EquipementTableComponent;
  let fixture: ComponentFixture<EquipementTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [EquipementTableComponent]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipementTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
