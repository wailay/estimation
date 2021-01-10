import { ResourceDialogComponent } from './../../dialogs/resource-dialog/resource-dialog.component';
import { TypeDialogComponent } from './../../dialogs/type-dialog/type-dialog.component';
import { DialogService } from './../../../../service/dialog/dialog.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ResourceService } from '@app/service/resource/resource.service';
import { Component, OnInit, SimpleChanges, EventEmitter, OnChanges, Input, Output } from '@angular/core';
import Tabulator from 'tabulator-tables';

@Component({
    selector: 'app-vrac-table',
    templateUrl: './vrac-table.component.html',
    styleUrls: ['./vrac-table.component.scss'],
})
export class VracTableComponent implements OnChanges {
    table: Tabulator;
    @Input() data: any[] = [];

    @Output() selected: EventEmitter<Tabulator.RowComponent> = new EventEmitter();

    rowMenu = [
        {
            label: 'Ajouter une ressource',
            action: (e, row) => {
                console.log('adding to vrac');
                this.openResourceForm(row);
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

    private headerMenu = [
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

    private columns: Tabulator.ColumnDefinition[] = [
        {
            title: 'Code',
            field: 'code',
            headerMenu: this.headerMenu,

            editor: 'input',
            editable: false,
        },
        { title: 'Description', field: 'description', editor: 'input', editable: false },
        { title: 'Unite', field: 'unit', editor: 'input', editable: false },
        { title: 'Prix Unitaire', field: 'unit_price', editor: 'number', editable: false },
    ];
    constructor(private resourceService: ResourceService, private modal: NzModalService, private dialogService: DialogService) {}

    ngOnChanges(changes: SimpleChanges): void {
        // if (this.table) this.table.setData(this.data);
        this.drawTable();
    }

    private drawTable(): void {
        this.table = new Tabulator('#vrac-table', {
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

                this.edit(id, field, value);
            },
            rowDblClick: (e, row) => {
                if (!row.getData().unit) return;
                this.selected.emit(row);
            },
        });
    }

    private openTypeForm(row): void {
        const modal = this.modal.create({
            nzTitle: 'Ajouter un type',
            nzContent: TypeDialogComponent,
        });

        modal.afterClose.subscribe((type) => {
            if (!type) return;
            this.resourceService.addType(type.code, 'V').then((res) => {
                if (res.status === 'error') {
                    console.log('error');
                    return;
                } else {
                    this.table.addData([{ id: res.id, code: type.code, children: [] }]);
                    this.table.redraw();
                }
            });
        });
    }

    private openResourceForm(row): void {
        const modal = this.modal.create({
            nzTitle: 'Ajouter une ressource',
            nzContent: ResourceDialogComponent,
        });

        const parentId = row ? row.getData().id : row;

        modal.afterClose.subscribe((resource) => {
            if (!resource) return;
            this.resourceService.addResource(resource, parentId, 'V').then((res) => {
                console.log(res);
                if (res.status === 'error') return;
                if (parentId) {
                    console.log(res.resource);
                    row.getData().children.push(res.resource);
                } else {
                    this.table.addData({ ...res.resource });
                }
                this.table.redraw();
            });
        });
    }

    private openDeleteModal(row): void {
        this.dialogService.openConfirm(this.deleteType.bind(this), row);
    }

    deleteType(row): void {
        const selectedRows = this.table.getSelectedRows();

        if (!selectedRows.length) {
            selectedRows.push(row);
        }

        selectedRows.forEach((rows: Tabulator.RowComponent) => {
            rows.delete();
            this.resourceService.deleteType(rows.getData().id).then((res) => {
                console.log('delete', res);
            });
        });
    }

    edit(id, field, value): void {
        this.resourceService.edit(id, field, value).then((res) => {
            console.log('edit ed! ', res);
        });
    }
}
