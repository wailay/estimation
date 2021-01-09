import { Component, OnInit, Input } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import Tabulator from 'tabulator-tables';

export interface TypeDialogData {
    row: Tabulator.RowComponent;
    added: boolean;
}
@Component({
    selector: 'app-type-dialog',
    templateUrl: './type-dialog.component.html',
    styleUrls: ['./type-dialog.component.scss'],
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
