import { NzModalRef } from 'ng-zorro-antd/modal';
import { Component, OnInit } from '@angular/core';
import { isNull } from '@angular/compiler/src/output/output_ast';

@Component({
    selector: 'app-bordereau-dialog',
    templateUrl: './bordereau-dialog.component.html',
    styleUrls: ['./bordereau-dialog.component.scss'],
})
export class BordereauDialogComponent implements OnInit {
    numero = '';
    description = '';
    unit = null;
    quantity = null;

    constructor(private modal: NzModalRef) {}

    ngOnInit(): void {}

    add(): void {
        this.modal.destroy({ numero: this.numero, description: this.description, unit: this.unit, quantity: this.quantity });
    }
    cancel(): void {
        this.modal.destroy();
    }

    get disabled(): boolean {
        return this.numero === '' || this.description === '';
    }
}
