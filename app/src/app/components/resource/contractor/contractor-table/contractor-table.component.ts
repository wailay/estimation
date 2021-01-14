import { Component } from '@angular/core';
import { DialogService } from '@app/service/dialog/dialog.service';
import { ResourceService } from '@app/service/resource/resource.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ResourceTableComponent } from './../../resource-table/resource-table.component';

@Component({
    selector: 'app-contractor-table',
    templateUrl: './contractor-table.component.html',
    styleUrls: ['./contractor-table.component.scss'],
})
export class ContractorTableComponent extends ResourceTableComponent {
    type = 'C';
    tableId = '#contractor-table';

    constructor(
        protected resourceService: ResourceService,
        protected modal: NzModalService,
        protected dialogService: DialogService,
        protected message: NzMessageService,
    ) {
        super(resourceService, modal, dialogService, message);
    }
}
