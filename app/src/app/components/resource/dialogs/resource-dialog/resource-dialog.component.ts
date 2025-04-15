import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { RowComponent } from 'tabulator-tables';

export interface ResourceDialogData {
    row: RowComponent;
}

@Component({
    selector: 'app-resource-dialog',
    templateUrl: './resource-dialog.component.html',
    styleUrls: ['./resource-dialog.component.scss'],
})
export class ResourceDialogComponent implements OnInit {
    @Input() withProduction!: boolean;

    resForm = this.fb.group({
        code: ['', Validators.required],
        description: ['', Validators.required],
        unit: ['', Validators.required],
        unit_price: ['', Validators.required],
        production: [{ value: '', disabled: !this.withProduction }],
        unit_production: [{ value: '', disabled: !this.withProduction }],
    });

    constructor(private modal: NzModalRef, public fb: FormBuilder) {}

    ngOnInit(): void {
        const oldRes = localStorage.getItem('resource');
        if (oldRes) {
            this.resForm.patchValue(JSON.parse(oldRes));
        }
        this.resForm.get('production').reset('');
        this.resForm.get('unit_production').reset('');
    }

    addResource(): void {
        this.modal.destroy(this.resForm.value);
        localStorage.setItem('resource', JSON.stringify(this.resForm.value));
    }

    cancel(): void {
        this.modal.destroy();
        localStorage.setItem('resource', JSON.stringify(this.resForm.value));
    }
}
