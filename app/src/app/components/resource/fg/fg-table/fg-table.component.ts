import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FgService } from '@app/service/fg/fg.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import Tabulator from 'tabulator-tables';
import { BordereauService } from './../../../../service/bordereau/bordereau.service';
import { DialogService } from './../../../../service/dialog/dialog.service';
import { FgDialogComponent } from './../../dialogs/fg-dialog/fg-dialog.component';

@Component({
    selector: 'app-fg-table',
    templateUrl: './fg-table.component.html',
    styleUrls: ['./fg-table.component.scss'],
})
export class FgTableComponent implements OnChanges {
    tableId = 'fg-table';

    table: Tabulator;
    @Input() data: any[] = [];

    rowMenu = [
        {
            label: 'Supprimer',
            action: (e, row) => {
                this.openDeleteModal(row);
            },
        },
    ];

    protected headerMenu = [
        {
            label: 'Ajouter un FG',
            action: () => {
                this.openFgForm(null);
            },
        },
    ];

    protected columns: Tabulator.ColumnDefinition[] = [
        { title: 'Description', field: 'description', editor: 'input', editable: false },
        { title: 'Quantite', field: 'quantity', editor: 'input', editable: false },
        { title: 'Unite', field: 'unit', editor: 'input', editable: false },
        {
            title: 'Prix Unitaire',
            field: 'unit_price',
            editor: 'number',
            editable: false,
            formatter: 'money',
            formatterParams: { symbol: '$' },
        },
        {
            title: 'Montant total',
            field: 'total_price',
            editable: false,
            formatter: 'money',
            formatterParams: { symbol: '$' },
            bottomCalc: 'sum',
            bottomCalcFormatter: 'money',
            bottomCalcFormatterParams: { symbol: '$' },
        },
    ];
    constructor(
        protected fgService: FgService,
        protected modal: NzModalService,
        protected dialogService: DialogService,
        protected message: NzMessageService,
        protected bordereau: BordereauService,
    ) {
        this.bordereau.getTotalPrice();
    }

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
            placeholder: 'Aucun FG',
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

                this.edit(id, field, value, cell.getRow());
            },
        });
    }

    openFgForm(row): void {
        const modal = this.modal.create({
            nzTitle: 'Ajouter un FG',
            nzContent: FgDialogComponent,
        });
        modal.afterClose.subscribe((fg) => {
            if (!fg) return;
            this.fgService.add(fg).then((res) => {
                if (res.status === 'error') {
                    this.message.error(res.message);
                    return;
                }

                this.table.addData(res.fg);
                this.table.redraw();
                this.fgService.getTotal();
                this.message.success(res.message);
            });
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
            this.fgService.delete(rows.getData().id).then((res) => {});
        });
    }

    async edit(id, field, value, row: Tabulator.RowComponent): Promise<void> {
        this.fgService.edit(id, field, value).then(async (res) => {
            if (res.status === 'error') {
                this.message.error(res.message);
                return;
            }

            row.update(res.fg);
            this.table.redraw();
            this.message.success(res.message);

            this.fgService.getTotal();
        });
    }

    get fgPercentage(): number {
        return this.fgService.percent;
    }
}
