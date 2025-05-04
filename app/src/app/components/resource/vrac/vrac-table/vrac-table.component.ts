import { Component } from '@angular/core';
import { ResourceService } from '@app/service/resource/resource.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { RowComponent } from 'tabulator-tables';
import { DialogService } from './../../../../service/dialog/dialog.service';
import { ResourceTableComponent } from './../../resource-table/resource-table.component';

@Component({
    selector: 'app-vrac-table',
    templateUrl: '../../resource-table/resource-table.component.html',
    styleUrls: ['./vrac-table.component.scss'],
    standalone: false,
})
export class VracTableComponent extends ResourceTableComponent {
    type = 'V';
    tableId = 'vrac-table';
    addButton = 'Vrac';

    constructor(
        protected resourceService: ResourceService,
        protected modal: NzModalService,
        protected dialogService: DialogService,
        protected message: NzMessageService,
    ) {
        super(resourceService, modal, dialogService, message);
    }

    async handleUploadCsv(row: RowComponent, id: number): Promise<void> {
        // Open window to select a file
        const csvData = await this.resourceService.readFile();

        console.log('csvData', csvData);

        for (const data of csvData) {
            const ressource = {
                code: data['0'],
                description: data['1'],
                unit: data['2'],
                unit_price: data['3'],
            };

            await this.addResource(ressource, id, row);
        }
    }
}
