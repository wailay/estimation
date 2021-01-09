import { NzModalService } from 'ng-zorro-antd/modal';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class DialogService {
    constructor(private modal: NzModalService) {}

    openConfirm(onOk: any, row: any): void {
        console.log(onOk);
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
