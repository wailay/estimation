import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EquipementDetailTableComponent } from './equipement-detail-table.component';

describe('DetailTableComponent', () => {
    let component: EquipementDetailTableComponent;
    let fixture: ComponentFixture<EquipementDetailTableComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [EquipementDetailTableComponent],
}).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(EquipementDetailTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
