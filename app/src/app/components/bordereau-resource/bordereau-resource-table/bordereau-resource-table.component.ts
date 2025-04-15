import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { IResource } from '@app/interfaces/models';
import { DialogService } from '@app/service/dialog/dialog.service';
import {} from 'events';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CellComponent, ColumnDefinition, RowComponent, TabulatorFull } from 'tabulator-tables';
import { Bordereau } from './../../../interfaces/models';
import { BordereauService } from './../../../service/bordereau/bordereau.service';
import { FgService } from './../../../service/fg/fg.service';
import { LookupComponent } from './../../lookup/lookup.component';

@Component({
    selector: 'app-bordereau-resource-table',
    templateUrl: './bordereau-resource-table.component.html',
    styleUrls: ['./bordereau-resource-table.component.scss'],
    standalone: false,
})
export class BordereauResourceTableComponent implements OnChanges {
    @Input() data: any[] = [];
    @Output() selected: EventEmitter<RowComponent> = new EventEmitter();
    moneyFormatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });
    selectedRow: RowComponent;

    table: TabulatorFull;
    rowMenu = [
        {
            label: 'Affecter une ressource',
            action: (e, row) => {
                this.openResourceTable(row);
            },
            disabled: (comp) => {
                return !comp.getData().quantity;
            },
        },
        {
            label: 'Supprimer',
            action: (e, row) => {
                this.openDeleteModal(row);
            },
        },
    ];

    private columns: ColumnDefinition[] = [
        { title: 'Numero', field: 'code', editable: false, formatter: this.boldFormatter },
        { title: 'Description', field: 'description', editable: false, formatter: this.boldFormatter },
        { title: 'Quantite Bordereau', field: 'quantity', editable: false, hozAlign: 'center' },
        { title: 'Unite', field: 'unit', editor: 'input', editable: false, hozAlign: 'center' },
        {
            title: 'Prix Unitaire Bordereau',
            field: 'b_unit_price',
            formatter: 'money',
            hozAlign: 'center',
            formatterParams: { symbol: '$' },
        },
        {
            title: 'Montant Final',
            field: 'total_price',
            hozAlign: 'center',
            formatter: this.totalBRFormatter,
            bottomCalc: 'sum',
            bottomCalcFormatter: 'money',
            bottomCalcFormatterParams: { symbol: '$' },
        },
        {
            title: 'Quantite Ressource',
            field: 'BordereauResource.quantity',
            editor: 'number',
            editorParams: { min: 1 },
            hozAlign: 'center',
        },
        { title: 'Production', field: 'BordereauResource.production', editor: 'number', editorParams: { min: 1 }, hozAlign: 'center' },
        { title: 'Unite de production', field: 'unit_production', editor: 'input', hozAlign: 'center' },
        { title: 'Duree', field: 'BordereauResource.duration', hozAlign: 'center' },
        { title: 'Prix Unitaire', field: 'unit_price', formatter: 'money', formatterParams: { symbol: '$' }, hozAlign: 'center' },
        { title: 'Prix Total Ressources', field: 'BordereauResource.total_price', editable: false, hozAlign: 'center' },
    ];
    constructor(
        private bordereauService: BordereauService,
        private modal: NzModalService,
        private dialogService: DialogService,
        private fg: FgService,
    ) {}

    private boldFormatter(c, p): string {
        const value = c.getValue();
        if ((c.getData() as Bordereau).BordereauId || c.getData().type) return value;

        return `<span style='font-weight:bold;'>` + value + '</span>';
    }

    private totalBRFormatter(cell: CellComponent): string {
        const value = cell.getValue();
        if (!value) return;
        const frmt = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        });
        cell.getElement().style.background = '#f5f242';
        return frmt.format(value).bold();
    }

    private sumCalc(values, data: Bordereau[], calcParams): number {
        let sum = 0;
        const recSum = (allData: Bordereau[] | IResource[]) => {
            allData.forEach((d) => {
                if (d.children) {
                    recSum(d.children);
                    sum += d.total_price;
                } else {
                    return;
                }
            });
        };

        recSum(data);

        return sum;
    }
    ngOnChanges(changes: SimpleChanges): void {
        this.drawTable();
    }

    private drawTable(): void {
        const element = document.getElementById('bordereau-resource-table');
        if (!element) {
            console.log(`Element with id bordereau-resource-table not found`);
            return;
        }

        this.table = new TabulatorFull('#bordereau-resource-table', {
            data: this.data,
            reactiveData: true, // enable data reactivity
            rowContextMenu: this.rowMenu,
            columns: this.columns,
            layout: 'fitColumns',
            height: '100%',
            dataTree: true,
            dataTreeStartExpanded: true,
            dataTreeChildField: 'children',
            dataTreeElementColumn: 'description',
            groupBy: 'description',
            columnCalcs: 'both',
            // groupClosedShowCalcs: true,
            // dataTreeChildColumnCalcs: true,
            // selectable: true,
            // selectableRollingSelection: true,
            // selectableRangeMode: 'click',
            placeholder: 'Bordereau vide',
        });

        this.table.on('cellEdited', (cell) => {
            const cellB = cell.getData() as Bordereau;
            const id = cellB.id;
            let field = cell.getColumn().getField();
            const value = cell.getValue();

            if (cellB.type) {
                const bordId = cellB.BordereauResource.BordereauId;
                const resId = cellB.BordereauResource.ResourceId;
                field = field.substring(field.indexOf('.') + 1);
                this.editBR(cell.getRow(), bordId, resId, field, value);
            } else {
                this.edit(id, field, value);
            }
        });
    }

    private openResourceTable(row: RowComponent): void {
        const modal = this.modal.create({
            nzTitle: 'Affecter une ressource',
            nzContent: LookupComponent,
            nzWidth: 1500,
        });

        const parentId = row.getData().id;
        modal.afterClose.subscribe((selected) => {
            if (!selected) return;

            const resources = selected.selected.map((sel: RowComponent) => sel.getData());

            this.bordereauService.affect(resources, parentId).then((res) => {
                if (res.status === 'error') return;

                row.update(res.bordereau);
                res.resources.forEach((r) => row.addTreeChild(r));
                this.bordereauService.getTotalPrice().then(() => {
                    this.fg.getTotal();
                });
            });
        });
    }

    private openDeleteModal(row: RowComponent): void {
        if (row.getData().type) {
            this.dialogService.openConfirm(this.deleteResources.bind(this), row);
        } else {
            this.dialogService.openConfirm(this.deleteBord.bind(this), row);
        }
    }

    edit(id, field, value): void {
        this.bordereauService.edit(id, field, value).then((res) => {});
    }

    async editBR(row: RowComponent, bordId, resId, field, value): Promise<void> {
        const bordResourceResult = await this.bordereauService.editBR(bordId, resId, field, value);
        const bordParentResult = await this.bordereauService.recompute(bordId);

        if (bordResourceResult.status === 'error' || bordParentResult.status === 'error') {
            return;
        }
        row.update({ BordereauResource: bordResourceResult.bordereau });
        (row.getTreeParent() as RowComponent).update(bordParentResult.bordereau);
    }

    deleteBord(row): void {
        const selectedRows = this.table.getSelectedRows();

        if (!selectedRows.length) {
            selectedRows.push(row);
        }

        selectedRows.forEach((rows: RowComponent) => {
            rows.delete();
            this.bordereauService.delete(row.getData().id).then((res) => {});
        });
    }

    async deleteResources(row: RowComponent): Promise<void> {
        const parentBord = row.getTreeParent() as RowComponent;

        const selectedRows = this.table.getSelectedRows();

        if (!selectedRows.length) {
            selectedRows.push(row);
        }

        selectedRows.forEach(async (rows: RowComponent) => {
            const bordId = (rows.getData() as IResource).BordereauResource.BordereauId;
            const resId = (rows.getData() as IResource).BordereauResource.ResourceId;
            rows.delete();
            await this.bordereauService.deleteRes(bordId, resId);
            const res = await this.bordereauService.recompute(parentBord.getData().id);
            parentBord.update(res.bordereau);
        });
    }
}
