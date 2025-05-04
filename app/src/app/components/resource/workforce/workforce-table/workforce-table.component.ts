import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { RowComponent } from 'tabulator-tables';
import { DialogService } from './../../../../service/dialog/dialog.service';
import { ResourceService } from './../../../../service/resource/resource.service';
import { ResourceTableComponent } from './../../resource-table/resource-table.component';

@Component({
    selector: 'app-workforce-table',
    templateUrl: '../../resource-table/resource-table.component.html',
    styleUrls: ['./workforce-table.component.scss'],
    standalone: false,
})
export class WorkforceTableComponent extends ResourceTableComponent {
    type = 'W';
    tableId = 'workforce-table';
    // tslint:disable-next-line: quotemark
    addButton = "Main d'eouvre";

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
