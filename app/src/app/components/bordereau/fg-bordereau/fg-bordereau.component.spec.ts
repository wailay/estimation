import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FgBordereauComponent } from './fg-bordereau.component';

describe('FgComponent', () => {
    let component: FgBordereauComponent;
    let fixture: ComponentFixture<FgBordereauComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [FgBordereauComponent],
}).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(FgBordereauComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
