import { Component, OnInit } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
    selector: 'app-bordereau-dialog',
    templateUrl: './bordereau-dialog.component.html',
    styleUrls: ['./bordereau-dialog.component.scss'],
})
export class BordereauDialogComponent implements OnInit {
    code = '';
    description = '';
    unit = null;
    quantity = null;

    constructor(private modal: NzModalRef) {}

    ngOnInit(): void {}

    add(): void {
        this.modal.destroy({ code: this.code, description: this.description, unit: this.unit, quantity: this.quantity });
    }
    cancel(): void {
        this.modal.destroy();
    }

    get disabled(): boolean {
        return this.code === '' || this.description === '';
    }
}
