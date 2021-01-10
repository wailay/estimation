import { ResourceService } from '@app/service/resource/resource.service';
import { Component, OnInit, SimpleChanges, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import Tabulator from 'tabulator-tables';

@Component({
    selector: 'app-transfer-table',
    templateUrl: './transfer-table.component.html',
    styleUrls: ['./transfer-table.component.scss'],
})
export class TransferTableComponent implements OnChanges {
    table: Tabulator;
    @Input() data: any[] = [];
    @Input() filter = '';
    @Output() selected: EventEmitter<Tabulator.RowComponent[]> = new EventEmitter();

    filtered = [];
    private columns: any[] = [
        { formatter: 'rowSelection', headerSort: false, hozAlign: 'center', width: 1 },
        { title: 'Code', field: 'code' },
        { title: 'Description', field: 'description' },
        { title: 'Unite', field: 'unit', editor: 'input' },
        { title: 'Prix Unitaire', field: 'unit_price' },
    ];
    constructor() {}

    ngOnChanges(changes: SimpleChanges): void {
        // if (this.table) this.table.setData(this.data);
        this.drawTable();
    }

    private drawTable(): void {
        this.table = new Tabulator('#transfer-table', {
            data: this.data,
            reactiveData: true, // enable data reactivity
            columns: this.columns,
            layout: 'fitColumns',
            height: '100%',
            dataTree: true,
            dataTreeFilter: true,
            dataTreeStartExpanded: true,
            dataTreeSelectPropagate: true,
            dataTreeElementColumn: 'code',
            dataTreeChildField: 'children',
            placeholder: 'Aucune resource',
            rowSelectionChanged: (data, rows) => {
                const newRows = rows.filter((row) => row.getData().unit);
                this.selected.emit(newRows);
            },
        });
    }

    filterTree(data: any[], value: string): void {
        data.forEach((element) => {
            if ('children' in element) {
                this.filterTree(element.children, value);
            } else {
                if (element.code.includes(value)) {
                    console.log(element.code);
                    this.filtered.push(element);
                }
            }
        });
    }

    onFilterChange(value: string): void {
        if (value.length === 0) {
            this.table.setData(this.data);
            return;
        }

        this.filtered = [];
        this.filterTree(this.data, value);
        this.table.setData(this.filtered);
    }

    get disabled(): boolean {
        return this.table.getSelectedRows().length > 0;
    }
}
