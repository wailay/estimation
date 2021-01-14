import { Component } from '@angular/core';
import { ResourceService } from '@app/service/resource/resource.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { DialogService } from './../../../../service/dialog/dialog.service';
import { ResourceTableComponent } from './../../resource-table/resource-table.component';

@Component({
    selector: 'app-vrac-table',
    templateUrl: './vrac-table.component.html',
    styleUrls: ['./vrac-table.component.scss'],
})
export class VracTableComponent extends ResourceTableComponent {
    type = 'V';
    tableId = '#vrac-table';

    constructor(
        protected resourceService: ResourceService,
        protected modal: NzModalService,
        protected dialogService: DialogService,
        protected message: NzMessageService,
    ) {
        super(resourceService, modal, dialogService, message);
    }
}
