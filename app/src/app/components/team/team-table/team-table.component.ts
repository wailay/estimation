import { Component } from '@angular/core';
import { DialogService } from '@app/service/dialog/dialog.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ResourceService } from './../../../service/resource/resource.service';
import { ResourceTableComponent } from './../../resource/resource-table/resource-table.component';

@Component({
    selector: 'app-team-table',
    templateUrl: './team-table.component.html',
    styleUrls: ['./team-table.component.scss'],
})
export class TeamTableComponent extends ResourceTableComponent {
    type = 'T';
    tableId = '#team-table';

    constructor(
        protected resourceService: ResourceService,
        protected modal: NzModalService,
        protected dialogService: DialogService,
        protected message: NzMessageService,
    ) {
        super(resourceService, modal, dialogService, message);
    }
}
