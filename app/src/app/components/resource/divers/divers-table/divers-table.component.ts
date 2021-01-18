import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { DialogService } from './../../../../service/dialog/dialog.service';
import { ResourceService } from './../../../../service/resource/resource.service';
import { ResourceTableComponent } from './../../resource-table/resource-table.component';

@Component({
    selector: 'app-divers-table',
    templateUrl: '../../resource-table/resource-table.component.html',
    styleUrls: ['./divers-table.component.scss'],
})
export class DiversTableComponent extends ResourceTableComponent {
    type = 'D';
    tableId = 'divers-table';

    constructor(
        protected resourceService: ResourceService,
        protected modal: NzModalService,
        protected dialogService: DialogService,
        protected message: NzMessageService,
    ) {
        super(resourceService, modal, dialogService, message);
    }
}
