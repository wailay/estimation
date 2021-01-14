import { Bordereau } from './../../../interfaces/models';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { DialogService } from '@app/service/dialog/dialog.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { BordereauService } from './../../../service/bordereau/bordereau.service';
import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import Tabulator from 'tabulator-tables';
import {} from 'events';

@Component({
    selector: 'app-bordereau-resource-table',
    templateUrl: './bordereau-resource-table.component.html',
    styleUrls: ['./bordereau-resource-table.component.scss'],
})
export class BordereauResourceTableComponent implements OnChanges {
    @Input() data: any[] = [];
    @Output() selected: EventEmitter<Tabulator.RowComponent> = new EventEmitter();
    selectedRow: Tabulator.RowComponent;

    table: Tabulator;
    rowMenu = [
        {
            label: 'Affecter une ressource',
            action: (e, row) => {
                this.openResourceForm(row);
            },
            disabled: (comp) => {
                return comp.getData().unit;
            },
        },
        {
            label: 'Supprimer',
            action: (e, row) => {
                this.openDeleteModal(row);
            },
        },
    ];

    private columns: Tabulator.ColumnDefinition[] = [
        {
            title: 'Numero',
            field: 'numero',
            editor: 'input',
            editable: false,
            formatter: this.boldFormatter,
        },
        {
            title: 'Description',
            field: 'description',
            editor: 'input',
            editable: false,
            formatter: this.boldFormatter,
        },
        { title: 'Quantite', field: 'quantity', editor: 'input', editable: false },
        { title: 'Unite', field: 'unit', editor: 'input', editable: false },
        { title: 'Production', field: 'production', editor: 'input', editable: false },
        { title: 'Duree', field: 'duration', editor: 'number', editable: false },
        { title: 'Total', field: 'total_price', editor: 'number', editable: false, formatter: 'money' },
    ];
    constructor(
        private bordereauService: BordereauService,
        private modal: NzModalService,
        private dialogService: DialogService,
        private message: NzMessageService,
        private router: Router,
    ) {}

    private boldFormatter(c, p): string {
        const value = c.getValue();
        if ((c.getData() as Bordereau).BordereauId) return value;

        return `<span style='font-weight:bold;'>` + value + '</span>';
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.drawTable();
    }

    private drawTable(): void {
        this.table = new Tabulator('#bordereau-table', {
            data: this.data,
            reactiveData: true, // enable data reactivity
            rowContextMenu: this.rowMenu,
            columns: this.columns,
            layout: 'fitColumns',
            height: '100%',
            dataTree: true,
            dataTreeElementColumn: 'description',
            dataTreeStartExpanded: true,
            dataTreeChildField: 'children',
            selectable: true,
            selectableRollingSelection: true,
            selectableRangeMode: 'click',
            placeholder: 'Bordereau vide',
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

    private openResourceForm(row): void {
        // const modal = this.modal.create({
        //     nzTitle: 'Ajouter une ressource',
        //     nzContent: ResourceDialogComponent,
        // });
        // const parentId = row ? row.getData().id : row;
        // modal.afterClose.subscribe((resource) => {
        //     if (!resource) return;
        //     this.bordereauService.add(resource, parentId, 'M').then((res) => {
        //         console.log(res);
        //         if (res.status === 'error') return;
        //         if (parentId) {
        //             console.log(res.resource);
        //             row.getData().children.push(res.resource);
        //         } else {
        //             this.table.addData({ ...res.resource });
        //         }
        //         this.table.redraw();
        //     });
        // });
    }

    private openDeleteModal(row): void {
        this.dialogService.openConfirm(this.deleteType.bind(this), row);
    }

    private openAffectation(): void {
        this.router.navigate(['affectation']);
    }

    edit(id, field, value): void {
        this.bordereauService.edit(id, field, value).then((res) => {
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
            this.bordereauService.delete(rows.getData().id).then((res) => {
                console.log('delete', res);
            });
        });
    }
}
