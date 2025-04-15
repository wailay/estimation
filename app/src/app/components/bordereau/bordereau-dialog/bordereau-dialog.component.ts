import { Component, OnInit } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
    selector: 'app-bordereau-dialog',
    templateUrl: './bordereau-dialog.component.html',
    styleUrls: ['./bordereau-dialog.component.scss'],
    standalone: false,
})
export class BordereauDialogComponent implements OnInit {
    form = {
        code: '',
        description: '',
        unit: '',
        quantity: '',
    };

    constructor(private modal: NzModalRef) {}

    ngOnInit(): void {
        const form = localStorage.getItem('bordereau');
        if (form) this.form = JSON.parse(form);
    }

    add(): void {
        localStorage.setItem('bordereau', JSON.stringify(this.form));
        this.modal.destroy({
            code: this.form.code,
            description: this.form.description,
            unit: this.form.unit,
            quantity: this.form.quantity,
        });
    }
    cancel(): void {
        localStorage.setItem('bordereau', JSON.stringify(this.form));
        this.modal.destroy();
    }

    get disabled(): boolean {
        return this.form.code === '' || this.form.description === '';
    }
}
