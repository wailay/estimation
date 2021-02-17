import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DialogService } from '@app/service/dialog/dialog.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import Tabulator from 'tabulator-tables';
import { ResourceService } from './../../../service/resource/resource.service';
import { ResourceDialogComponent } from './../dialogs/resource-dialog/resource-dialog.component';
import { TypeDialogComponent } from './../dialogs/type-dialog/type-dialog.component';
@Component({
    selector: 'app-resource-table',
    templateUrl: './resource-table.component.html',
    styleUrls: ['./resource-table.component.scss'],
})
export class ResourceTableComponent implements OnChanges {
    type: string;
    tableId: string;

    table: Tabulator;
    @Input() data: any[] = [];
    parentResourceId: number = undefined;

    rowMenu = [
        {
            label: 'Ajouter une ressource',
            action: (e, row) => {
                this.openResourceForm(row);
            },
            disabled: (comp) => {
                return comp.getData().unit;
            },
        },
        {
            label: 'Ajouter CSV',
            action: (e, row) => {
                this.handleUpload(row, row.getData().id);
            },
            disabled: (comp) => {
                return comp.getData().unit;
            },
        },
        { separator: true },
        {
            label: 'Supprimer',
            action: (e, row) => {
                this.openDeleteModal(row);
            },
        },
    ];

    protected headerMenu = [
        {
            label: 'Nouveau dossier',
            action: () => {
                this.openTypeForm(null);
            },
        },
        {
            label: 'Ajouter une ressource',
            action: () => {
                this.openResourceForm(null);
            },
        },
    ];

    protected columns: Tabulator.ColumnDefinition[] = [
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
        { title: 'Production', field: 'production', editor: 'number' },
        { title: 'Unite de Production', field: 'unit_production', editor: 'input' },
    ];

    addButton: string;
    constructor(
        protected resourceService: ResourceService,
        protected modal: NzModalService,
        protected dialogService: DialogService,
        protected message: NzMessageService,
    ) {}

    ngOnChanges(changes: SimpleChanges): void {
        // if (this.table) this.table.setData(this.data);
        this.drawTable();
    }

    protected drawTable(): void {
        this.table = new Tabulator(`#${this.tableId}`, {
            data: this.data,
            reactiveData: true, // enable data reactivity
            rowContextMenu: this.rowMenu,
            columns: this.columns,
            layout: 'fitColumns',
            height: '100%',
            dataTree: true,
            dataTreeStartExpanded: true,
            dataTreeChildField: 'children',
            selectable: true,
            selectableRangeMode: 'click',
            selectableRollingSelection: true,
            placeholder: 'Aucune resource',
            cellDblClick: (e, cell) => {
                if (cell.getRow().getData().unit) {
                    cell.edit(true);
                } else if (!cell.getRow().getData().unit && cell.getField() === 'code') {
                    cell.edit(true);
                }
            },
            cellEdited: (cell) => {
                const id = (cell.getData() as any).id;
                const field = cell.getColumn().getField();
                const value = cell.getValue();

                this.edit(id, field, value, this.type);
            },
            rowClick: (e, row) => {
                if (!row.getData().unit) return;
                this.resourceService.select(row);
            },
        });
    }

    openTypeForm(row): void {
        const modal = this.modal.create({
            nzTitle: 'Ajouter un type',
            nzContent: TypeDialogComponent,
        });

        modal.afterClose.subscribe((type) => {
            if (!type) return;
            this.resourceService.addFolder(type.code, this.type).then((res) => {
                if (res.status === 'error') {
                    this.message.error(res.message);
                    return;
                } else {
                    this.table.addData([{ id: res.id, code: type.code, children: [] }]);
                    this.table.redraw();
                }
            });
        });
    }

    openResourceForm(row): void {
        const modal = this.modal.create({
            nzTitle: 'Ajouter une ressource',
            nzContent: ResourceDialogComponent,
            nzComponentParams: { withProduction: this.type === 'FG' },
        });

        const parentId = row ? row.getData().id : row;

        modal.afterClose.subscribe((resource) => {
            if (!resource) return;
            this.addResource(resource, parentId, row);
        });
    }

    protected openDeleteModal(row): void {
        this.dialogService.openConfirm(this.deleteType.bind(this), row);
    }

    deleteType(row): void {
        const selectedRows = this.table.getSelectedRows();

        if (!selectedRows.length) {
            selectedRows.push(row);
        }

        selectedRows.forEach((rows: Tabulator.RowComponent) => {
            rows.delete();
            this.resourceService.delete(rows.getData().id).then((res) => {});
        });
    }

    edit(id, field, value, resType: string): void {
        this.resourceService.edit(id, field, value, resType).then((res) => {});
    }

    async addResource(resource: any, parentId: number, row: any): Promise<void> {
        const res = await this.resourceService.addResource(resource, parentId, this.type);
        this.updateData(res, parentId, row);
    }

    updateData(res: any, parentId: number, row: any): void {
        if (res.status === 'error') {
            this.message.error(res.message);
            return;
        }
        if (parentId) {
            row.getData().children.push(res.resource);
        } else {
            this.table.addData({ ...res.resource });
        }
        this.table.redraw();
        this.message.success(res.message);
    }

    async handleUpload(row: Tabulator.RowComponent, id: number): Promise<void> {}
}
