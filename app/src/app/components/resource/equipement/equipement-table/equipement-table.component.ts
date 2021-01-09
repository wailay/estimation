import { AfterViewInit, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import Tabulator from 'tabulator-tables';
import { EquipementService } from './../../../../service/resource/equipement/equipement.service';
import { ResourceService } from './../../../../service/resource/resource.service';

@Component({
    selector: 'app-equipement-table',
    templateUrl: './equipement-table.component.html',
    styleUrls: ['./equipement-table.component.scss'],
})
export class EquipementTableComponent implements AfterViewInit, OnChanges {
    table: Tabulator;
    @Input() data: any[] = [];

    @Output() selected: EventEmitter<Tabulator.RowComponent> = new EventEmitter();

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
    constructor(private equipementService: EquipementService, private resourceService: ResourceService, private modalService: NzModalService) {}

    ngAfterViewInit(): void {
        this.drawTable();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (this.table) this.table.setData(this.data);
    }

    private drawTable(): void {
        this.table = new Tabulator('#equipement-table', {
            data: this.data,
            reactiveData: true, // enable data reactivity
            rowContextMenu: this.rowMenu,
            columns: this.columns,
            layout: 'fitColumns',
            height: '100%',
            dataTree: true,
            dataTreeStartExpanded: true,
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
            selectableCheck: (row) => {
                return row.getData().unit;
            },
            rowDblClick: (e, row) => {
                if (!row.getData().unit) return;
                this.selected.emit(row);
                this.equipementService.selected.next(row);
            },
        });
    }

    private openTypeForm(row): void {
        // const ref = this.dialog.open(TypeDialogComponent);
        // ref.afterClosed().subscribe((type) => {
        //     if (!type) return;
        //     this.equipementService.addCode(type.code).then((res) => {
        //         if (res.status === 'error') {
        //             console.log('error');
        //             return;
        //         } else {
        //             this.table.addData([{ id: res.id, code: type.code, _children: [] }]);
        //             this.table.redraw();
        //         }
        //     });
        // });
    }

    private openResourceForm(row): void {
        // const ref = this.dialog.open(ResourceDialogComponent);
        // const parentId = row ? row.getData().id : row;
        // ref.afterClosed().subscribe((resource) => {
        //     if (!resource) return;
        //     this.equipementService.addResource(resource, parentId).then((res) => {
        //         console.log(res);
        //         if (res.status === 'error') return;
        //         if (parentId) {
        //             console.log(res.resource);
        //             row.getData()._children.push(res.resource);
        //         } else {
        //             this.table.addData({ ...res.resource });
        //         }
        //         this.table.redraw();
        //     });
        // });
    }

    private openDeleteModal(row): void {
        // const ref = this.dialog.open(DeleteDialogComponent);
        // ref.afterClosed().subscribe((confirmation) => {
        //     console.log(confirmation);
        //     if (confirmation) {
        //         this.deleteType(row);
        //     }
        // });
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
