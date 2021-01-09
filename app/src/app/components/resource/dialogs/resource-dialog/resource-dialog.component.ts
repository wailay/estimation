import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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
    });

    constructor(
        // public dialogRef: MatDialogRef<TypeDialogComponent>, // @Inject(MAT_DIALOG_DATA) public data: ResourceDialogData,
        public fb: FormBuilder,
    ) {}

    ngOnInit(): void {}

    addResource(): void {
        // this.dialogRef.close(this.resForm.value);
        // this.resForm.reset();
    }
}
