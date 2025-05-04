import { Component } from '@angular/core';
import { ResourceService } from '@app/service/resource/resource.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ColumnDefinition, RowComponent } from 'tabulator-tables';
import { DialogService } from './../../../../service/dialog/dialog.service';
import { ResourceTableComponent } from './../../resource-table/resource-table.component';

@Component({
    selector: 'app-fg-table',
    templateUrl: '../../resource-table/resource-table.component.html',
    styleUrls: ['./fg-table.component.scss'],
    standalone: false,
})
export class FgTableComponent extends ResourceTableComponent {
    type = 'FG';
    tableId = 'fg-table';
    addButton = 'Frais Generaux';

    protected columns: ColumnDefinition[] = [
        { title: 'Code', field: 'code', headerMenu: this.headerMenu, editor: 'input' },
        { title: 'Description', field: 'description', editor: 'input' },
        { title: 'Unite', field: 'unit', editor: 'input' },
        {
            title: 'Prix Unitaire',
            field: 'unit_price',
            editor: 'number',
            formatter: 'money',
            formatterParams: { symbol: '$' },
        },
    ];

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
