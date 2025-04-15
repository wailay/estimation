import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FgService } from '@app/service/fg/fg.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ColumnDefinition, RowComponent, Tabulator } from 'tabulator-tables';
import { BordereauService } from '../../../../service/bordereau/bordereau.service';
import { DialogService } from '../../../../service/dialog/dialog.service';
import { ProjectService } from './../../../../service/project/project.service';
import { LookupComponent } from './../../../lookup/lookup.component';

@Component({
    selector: 'app-fg-bordereau-table',
    templateUrl: './fg-bordereau-table.component.html',
    styleUrls: ['./fg-bordereau-table.component.scss'],
    standalone: false,
})
export class FgBordereauTableComponent implements OnChanges {
    tableId = 'fg-bordereau-table';

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
                this.openFgForm();
            },
        },
    ];

    protected columns: ColumnDefinition[] = [
        { title: 'Code', field: 'code', editable: false },
        { title: 'Description', field: 'description', editable: false },
        { title: 'Quantite', field: 'quantity', editor: 'number', editorParams: { min: 1 }, editable: false },
        { title: 'Unite', field: 'unit', editable: false },
        {
            title: 'Prix Unitaire',
            field: 'unit_price',
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
        protected project: ProjectService,
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
            height: '70%',
            placeholder: 'Aucun FG',
        });

        this.table.on('cellDblClick', (e, cell) => {
            cell.edit(true);
        });

        this.table.on('cellEdited', (cell) => {
            const id = (cell.getData() as any).id;
            const field = cell.getColumn().getField();
            const value = cell.getValue();

            this.edit(id, field, value, cell.getRow());
        });
    }

    openFgForm(): void {
        const modal = this.modal.create({
            nzTitle: 'Ajouter un FG',
            nzContent: LookupComponent,
            nzData: { withEquipe: false, resourceType: 'FG' },
            nzWidth: 1000,
        });

        modal.afterClose.subscribe((fg) => {
            if (!fg) return;

            const selected = fg.selected as RowComponent[];

            selected.forEach((row) => {
                const data = row.getData();
                const fgToDadd = {
                    total_price: data.unit_price,
                    quantity: 1,
                    ProjectId: this.project.currentProjectId,
                    ResourceId: data.id,
                };

                this.fgService.add(fgToDadd).then((res) => {
                    if (res.status === 'error') {
                        this.message.error(res.message);
                        return;
                    }

                    this.table.addData([{ ...data, ...fgToDadd }]);
                    this.table.redraw();
                    this.fgService.getTotal();
                    this.message.success(res.message);
                });
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

        selectedRows.forEach((rows: RowComponent) => {
            rows.delete();
            this.fgService.delete(rows.getData().id).then((res) => {});
        });
    }

    async edit(id, field, value, row: RowComponent): Promise<void> {
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
