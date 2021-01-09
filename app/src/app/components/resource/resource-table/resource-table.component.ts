import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Tabulator } from 'tabulator-tables';
import { ResourceService } from './../../../service/resource/resource.service';

@Component({
    selector: 'app-resource-table',
    templateUrl: './resource-table.component.html',
    styleUrls: ['./resource-table.component.scss'],
})
export class ResourceTableComponent implements OnChanges {
    @Input() data: any[] = [];
    @Output() selected: EventEmitter<Tabulator.RowComponent> = new EventEmitter();
    selectedRow: Tabulator.RowComponent;

    table: Tabulator;
    rowMenu = [
        {
            label: 'Ajouter un sous dossier',
            action: (e, row) => {
                this.openTypeForm(row);
            },
            disabled: (comp) => {
                return comp.getData().unit;
            },
        },
        { separator: true },
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
        { title: 'Transport', field: 'transport', editor: 'number', editable: false },
    ];
    constructor(private resourceService: ResourceService) {}

    ngOnChanges(changes: SimpleChanges): void {
        this.drawTable();
    }

    private drawTable(): void {
        this.table = new Tabulator('#res-table', {
            data: this.data,
            reactiveData: true, // enable data reactivity
            rowContextMenu: this.rowMenu,
            columns: this.columns,
            layout: 'fitColumns',
            height: '100%',
            dataTree: true,
            dataTreeStartExpanded: true,
            selectable: true,
            selectableRollingSelection: true,
            selectableRangeMode: 'click',
            cellDblClick: (e, cell) => {
                cell.edit(true);
            },
            cellEdited: (cell) => {
                const id = (cell.getData() as any).id;
                const field = cell.getColumn().getField();
                const value = cell.getValue();

                this.edit(id, field, value);
            },
            rowClick: (e: MouseEvent, row) => {
                if (e.shiftKey) {
                    return;
                }

                if (!row.getData().unit) {
                    row.deselect();
                    return;
                }

                this.selected.emit(row);
            },
        });
    }

    private openTypeForm(row): void {
        // const ref = this.dialog.open(TypeDialogComponent, { data: { row } });
        // ref.afterClosed().subscribe((res) => {
        //     if (!res) return;
        //     const typeId = row?.getData().id;
        //     if (typeId) {
        //         row?.getData()._children.push({ id: res.id, code: res.type, _children: [] });
        //     } else {
        //         this.table.addData([{ id: res.id, code: res.type, _children: [] }]);
        //     }
        //     this.table.redraw();
        // });
    }

    private openResourceForm(row): void {
        // const ref = this.dialog.open(ResourceDialogComponent, { data: { row } });
        // ref.afterClosed().subscribe((result) => {
        //     if (!result) return;
        //     row.getData()._children.push(result);
        //     this.table.redraw();
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

    edit(id, field, value): void {
        this.resourceService.edit(id, field, value).then((res) => {
            console.log('edit ed! ', res);
        });
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
}
