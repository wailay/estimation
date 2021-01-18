import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import Tabulator from 'tabulator-tables';

export interface ResourceDialogData {
    row: Tabulator.RowComponent;
}

@Component({
    selector: 'app-resource-dialog',
    templateUrl: './resource-dialog.component.html',
    styleUrls: ['./resource-dialog.component.scss'],
})
export class ResourceDialogComponent implements OnInit {
    resForm = this.fb.group({
        code: ['', Validators.required],
        description: ['', Validators.required],
        unit: ['', Validators.required],
        unit_price: ['', Validators.required],
        production: [''],
        unit_production: [''],
    });

    constructor(private modal: NzModalRef, public fb: FormBuilder) {}

    ngOnInit(): void {}

    addResource(): void {
        this.modal.destroy(this.resForm.value);
        this.resForm.reset();
    }

    cancel(): void {
        this.modal.destroy();
        this.resForm.reset();
    }
}
