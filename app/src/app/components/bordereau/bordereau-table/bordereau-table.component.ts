import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { DialogService } from '@app/service/dialog/dialog.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import Tabulator from 'tabulator-tables';
import { BordereauDialogComponent } from './../../../components/bordereau/bordereau-dialog/bordereau-dialog.component';
import { Bordereau } from './../../../interfaces/models';
import { BordereauService } from './../../../service/bordereau/bordereau.service';

export const UNIT_BORD = { '': 'aucune', mcu: 'mcu', tm: 'tm', 'm-ca': 'm-ca', ml: 'ml', un: 'un', global: 'global' };
@Component({
    selector: 'app-bordereau-table',
    templateUrl: './bordereau-table.component.html',
    styleUrls: ['./bordereau-table.component.scss'],
})
export class BordereauTableComponent implements OnChanges {
    @Input() data: any[] = [];
    @Output() selected: EventEmitter<Tabulator.RowComponent> = new EventEmitter();
    selectedRow: Tabulator.RowComponent;

    table: Tabulator;
    rowMenu = [
        {
            label: 'Ajouter un sous item',
            action: (e, row) => {
                this.openItemForm(row);
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

    private headerMenu = [
        {
            label: 'Nouvel item',
            action: () => {
                this.openItemForm(null);
            },
        },
    ];

    private columns: Tabulator.ColumnDefinition[] = [
        {
            title: 'Numero',
            field: 'code',
            headerMenu: this.headerMenu,
            editor: 'input',
            editable: false,
            formatter: this.boldFormatter,
        },
        {
            title: 'Description',
            field: 'description',
            editor: 'input',
            editable: false,
            formatter: this.textFormatter,
            headerFilter: 'input',
            headerFilterLiveFilter: false,
        },
        { title: 'Quantite Bordereau', field: 'quantity', editor: 'input' },
        { title: 'Unite Bordereau', field: 'unit', editor: 'input' },
        { title: 'Prix Unitaire', field: 'b_unit_price', formatter: 'money', formatterParams: { symbol: '$' } },
        { title: 'Montant Final', field: 'total_price', formatter: 'money', formatterParams: { symbol: '$' }, bottomCalc: 'sum' },
        { title: 'Montant Final Vendant', field: 'total_price_vendant', formatter: 'money', bottomCalc: 'sum' },
    ];
    constructor(
        private bordereauService: BordereauService,
        private modal: NzModalService,
        private dialogService: DialogService,
        private message: NzMessageService,
    ) {}

    private boldFormatter(c, p): string {
        const value = c.getValue();
        if (!(c.getData() as Bordereau).BordereauId) return `<span style='font-weight:bold;'>` + value + '</span>';

        return value;
    }

    private textFormatter(c, p): string {
        const value = c.getValue();
        if (!(c.getData() as Bordereau).BordereauId) return `<span style='font-weight:bold;'>` + value + '</span>';
        if ((c.getData() as Bordereau).BordereauId && !c.getData().type && !c.getData().quantity)
            return `<span style='text-decoration:underline;'>` + value + '</span>';

        return value;
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
            height: '91%',
            dataTree: true,
            dataTreeStartExpanded: [true, false],
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
            movableRows: true,
        });
    }

    openItemForm(row: Tabulator.RowComponent): void {
        const modal = this.modal.create({
            nzTitle: 'Ajouter un item',
            nzContent: BordereauDialogComponent,
        });

        const parent = row ? row.getData().id : null;
        modal.afterClose.subscribe((travail: Bordereau) => {
            if (!travail) return;
            this.bordereauService.add(travail, parent).then((res) => {
                if (res.status === 'error') {
                    this.message.error('Cet item existe deja');
                    return;
                } else {
                    if (parent) {
                        row.getData().children.push({
                            id: res.id,
                            code: travail.code,
                            description: travail.description,
                            unit: travail.unit,
                            quantity: travail.quantity,
                            children: [],
                            BordereauId: parent,
                        });
                    } else {
                        this.table.addData([
                            {
                                id: res.id,
                                code: travail.code,
                                description: travail.description,
                                unit: travail.unit,
                                quantity: travail.quantity,
                                children: [],
                            },
                        ]);
                    }
                    this.table.redraw();
                }
            });
        });
    }

    private openDeleteModal(row): void {
        this.dialogService.openConfirm(this.deleteType.bind(this), row);
    }

    edit(id, field, value): void {
        this.bordereauService.edit(id, field, value).then((res) => {});
    }

    deleteType(row): void {
        const selectedRows = this.table.getSelectedRows();

        if (!selectedRows.length) {
            selectedRows.push(row);
        }

        selectedRows.forEach((rows: Tabulator.RowComponent) => {
            rows.delete();
            this.bordereauService.delete(rows.getData().id).then((res) => {});
        });
    }
}
