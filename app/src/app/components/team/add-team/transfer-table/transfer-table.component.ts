import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { RowComponent, TabulatorFull } from 'tabulator-tables';

@Component({
    selector: 'app-transfer-table',
    templateUrl: './transfer-table.component.html',
    styleUrls: ['./transfer-table.component.scss'],
    standalone: false,
})
export class TransferTableComponent implements OnChanges {
    table: TabulatorFull;
    @Input() id = '';
    @Input() data: any[] = [];
    @Input() filter = '';
    @Output() selected: EventEmitter<RowComponent[]> = new EventEmitter();
    currentSelected: any[] = [];

    filtered = [];
    private columns: any[] = [
        { formatter: 'rowSelection', headerSort: false, hozAlign: 'center', width: 1 },
        { title: 'Code', field: 'code' },
        { title: 'Description', field: 'description' },
        { title: 'Unite', field: 'unit' },
        { title: 'Prix Unitaire', field: 'unit_price' },
    ];
    constructor() {}

    ngOnChanges(changes: SimpleChanges): void {
        this.drawTable();
    }

    private drawTable(): void {
        const element = document.getElementById(this.id);
        if (!element) {
            console.log(`Element with id ${this.id} not found`);
            return;
        }

        this.table = new TabulatorFull(`#${this.id}`, {
            data: this.data,
            reactiveData: true, // enable data reactivity
            columns: this.columns,
            layout: 'fitColumns',
            height: '500px',
            dataTree: true,
            dataTreeFilter: true,
            dataTreeStartExpanded: true,
            dataTreeSelectPropagate: true,
            dataTreeElementColumn: 'code',
            dataTreeChildField: 'children',
            placeholder: 'Aucune resource',
        });

        this.table.on('rowSelectionChanged', (e, rows) => {
            const newRows = rows.filter((row) => row.getData().unit);
            this.selected.emit(newRows);
            console.log(rows);
            this.currentSelected = rows;
        });
    }

    filterTree(data: any[], value: string): void {
        data.forEach((element) => {
            if ('children' in element) {
                this.filterTree(element.children, value);
            } else {
                if (element.code.includes(value)) {
                    this.filtered.push(element);
                }
            }
        });
    }

    onFilterChange(value: string): void {
        if (value.length === 0) {
            this.table.setData(this.data);
            // this.currentSelected.forEach((row) => this.table.selectRow(row.id));

            return;
        }

        this.filtered = [];
        this.filterTree(this.data, value);
        // this.currentSelected = this.table.getSelectedData();
        this.table.setData(this.filtered);
        // this.currentSelected.forEach((row) => this.table.selectRow(row.id));
    }

    get disabled(): boolean {
        return this.table.getSelectedRows().length > 0;
    }
}
