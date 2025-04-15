import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
    selector: 'app-fg-dialog',
    templateUrl: './fg-dialog.component.html',
    styleUrls: ['./fg-dialog.component.scss'],
    standalone: false,
})
export class FgDialogComponent implements OnInit {
    fgForm = this.fb.group({
        description: ['', Validators.required],
        quantity: ['', Validators.required],
        unit: ['', Validators.required],
        unit_price: ['', Validators.required],
    });

    constructor(private modal: NzModalRef, public fb: FormBuilder) {}

    ngOnInit(): void {
        const oldRes = localStorage.getItem('fg');
        if (oldRes) {
            this.fgForm.patchValue(JSON.parse(oldRes));
        }
    }

    addFG(): void {
        this.modal.destroy({ ...this.fgForm.value, total_price: this.total });
        localStorage.setItem('fg', JSON.stringify(this.fgForm.value));
    }

    cancel(): void {
        this.modal.destroy();
        localStorage.setItem('fg', JSON.stringify(this.fgForm.value));
    }

    get total(): number {
        return Number(this.fgForm.value.quantity) * Number(this.fgForm.value.unit_price);
    }
}
