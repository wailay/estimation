import { Component, OnInit } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { RowComponent } from 'tabulator-tables';

export interface TypeDialogData {
    row: RowComponent;
    added: boolean;
}
@Component({
    selector: 'app-type-dialog',
    templateUrl: './type-dialog.component.html',
    styleUrls: ['./type-dialog.component.scss'],
    standalone: false,
})
export class TypeDialogComponent implements OnInit {
    code = '';
    constructor(private modal: NzModalRef) {}

    ngOnInit(): void {}

    add(): void {
        this.modal.destroy({ code: this.code });
    }
    cancel(): void {
        this.modal.destroy();
    }
}
