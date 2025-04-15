import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { DialogService } from '@app/service/dialog/dialog.service';
import { FgService } from '@app/service/fg/fg.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ColumnDefinition, RowComponent, Tabulator } from 'tabulator-tables';
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
    @Output() selected: EventEmitter<RowComponent> = new EventEmitter();
    selectedRow: RowComponent;

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

    private columns: ColumnDefinition[] = [
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
        },
        { title: 'Quantite Bordereau', field: 'quantity', editor: 'input', editable: false },
        { title: 'Unite Bordereau', field: 'unit', editor: 'input', editable: false },
        { title: 'Prix Unitaire', field: 'b_unit_price', formatter: 'money', formatterParams: { symbol: '$' } },
        { title: 'Montant Final', field: 'total_price', formatter: 'money', formatterParams: { symbol: '$' }, bottomCalc: 'sum' },
        {
            title: 'FG',
            field: 'fg',
            titleFormatter: this.fgFormatter.bind(this),
            formatter: 'money',
            formatterParams: { symbol: '$' },
            mutator: this.fgMutator.bind(this),
        },
        {
            title: 'Prix unitaire avec FG',
            field: 'pufg',
            formatter: 'money',
            formatterParams: { symbol: '$' },
            mutator: this.pufgMutator.bind(this),
        },
        {
            title: 'Profit',
            field: 'profit',
            titleFormatter: this.profitFormatter.bind(this),
            formatter: 'money',
            formatterParams: { symbol: '$' },
            mutator: this.profitMutator.bind(this),
        },
        {
            title: 'Prix Unitaire avec Profit',
            field: 'puprofit',
            formatter: 'money',
            formatterParams: { symbol: '$' },
            mutator: this.puprofitMutator.bind(this),
        },
        {
            title: 'Montant Final Vendant',
            field: 'total_price_vendant',
            formatter: 'money',
            bottomCalc: 'sum',
            formatterParams: { symbol: '$' },
            mutator: this.vendantMutator.bind(this),
        },
    ];
    constructor(
        private bordereauService: BordereauService,
        private modal: NzModalService,
        private dialogService: DialogService,
        private message: NzMessageService,
        private fgService: FgService,
    ) {}

    private boldFormatter(c, p): string {
        const value = c.getValue();
        if (!(c.getData() as Bordereau).BordereauId || !(c.getData() as Bordereau).BordereauResource)
            return `<span style='font-weight:bold;'>` + value + '</span>';

        return value;
    }

    private textFormatter(c, p): string {
        const value = c.getValue();
        if (!(c.getData() as Bordereau).BordereauId) return `<span style='font-weight:bold;'>` + value + '</span>';
        if ((c.getData() as Bordereau).BordereauId && !c.getData().type && !c.getData().quantity)
            return `<span style='text-decoration:underline;'>` + value + '</span>';

        return value;
    }

    private fgFormatter(c, p, o): string {
        return c.getValue() + ` (${this.fgService.percent.toFixed(2)} %)`;
    }

    private profitFormatter(c, p, o): string {
        return c.getValue() + ` (${this.fgService.profit} %)`;
    }

    private fgMutator(val, data): number | undefined {
        if (!data.b_unit_price) return undefined;
        return this.decimalPrecision((this.fgService.percent / 100) * data.b_unit_price);
    }
    private pufgMutator(val, data): number | undefined {
        if (!data.b_unit_price) return undefined;
        return this.decimalPrecision(data.b_unit_price + data.fg);
    }
    private profitMutator(val, data): number | undefined {
        if (!data.b_unit_price) return undefined;
        return this.decimalPrecision(data.pufg * (this.fgService.profit / 100));
    }
    private puprofitMutator(val, data): number | undefined {
        if (!data.b_unit_price) return undefined;
        return this.decimalPrecision(data.pufg + data.profit);
    }
    private vendantMutator(val, data): number | undefined {
        if (!data.b_unit_price) return undefined;
        return this.decimalPrecision(data.puprofit * data.quantity);
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.drawTable();
    }

    decimalPrecision(value: number, prec = 2): number {
        return parseFloat(value.toFixed(prec));
    }

    private drawTable(): void {
        this.table = new Tabulator('#bordereau-table', {
            data: this.data,
            reactiveData: true, // enable data reactivity
            rowContextMenu: this.rowMenu,
            columns: this.columns,
            layout: 'fitColumns',
            height: '91%',
            headerSort: false,
            dataTree: true,
            dataTreeStartExpanded: true,
            dataTreeChildField: 'children',
            selectableRows: true,
            selectableRowsRollingSelection: true,
            selectableRowsRangeMode: 'click',
            placeholder: 'Bordereau vide',
        });

        this.table.on('cellDblClick', (e, cell) => {
            if (cell.getValue().length > 0 || typeof cell.getValue() === 'number') {
                cell.edit(true);
            }
        });

        this.table.on('cellEdited', (cell) => {
            const id = (cell.getData() as any).id;
            const field = cell.getColumn().getField();
            const value = cell.getValue();

            this.edit(id, field, value, cell.getRow());
        });

        this.table.on('rowClick', (e: MouseEvent, row) => {
            if (e.shiftKey) {
                return;
            }

            if (!row.getData().unit) {
                row.deselect();
                return;
            }

            this.selected.emit(row);
        });
    }

    openItemForm(row: RowComponent): void {
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

    async edit(id, field, value, row: RowComponent): Promise<void> {
        const res = await this.bordereauService.edit(id, field, value);
        if (res.status === 'error') {
            return;
        }

        row.update(res.bordereau);
        this.updateHack();
    }

    deleteType(row): void {
        const selectedRows = this.table.getSelectedRows();

        if (!selectedRows.length) {
            selectedRows.push(row);
        }

        selectedRows.forEach((rows: RowComponent) => {
            rows.delete();
            this.bordereauService.delete(rows.getData().id).then((res) => {});
        });
    }

    downloadExcel(): void {
        this.table.download('xlsx', `bordereau${new Date().toLocaleDateString('en-US')}.xlsx`, { sheetName: 'Bordereau' });
    }

    downloadPDF(): void {
        this.table.download('pdf', `bordereau${new Date().toLocaleDateString('en-US')}.pdf`, { autoTable: { theme: 'grid' } });
    }

    // slow
    updateHack(): void {
        this.table.setColumns(this.columns);
        this.table.setData(this.table.getData());
    }

    setProfit(profit: number): void {
        if (!profit) return;
        this.fgService.profit = profit;

        // hack
        this.updateHack();
    }
}
