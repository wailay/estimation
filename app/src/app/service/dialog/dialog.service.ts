import { Injectable } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';

@Injectable({
    providedIn: 'root',
})
export class DialogService {
    constructor(private modal: NzModalService) {}

    openConfirm(onOk: any, row: any): void {
        this.modal.confirm({
            nzTitle: 'Etes-vous sur de vouloir supprimer ?',
            nzOkText: 'Oui',
            nzOkType: 'primary',
            nzOkDanger: true,
            nzOnOk: () => {
                onOk(row);
            },
            nzCancelText: 'Non',
            nzOnCancel: () => {},
        });
    }
}
