import { Component, OnInit } from '@angular/core';
import { Tabulator } from 'tabulator-tables';

@Component({
    selector: 'app-detail-table',
    templateUrl: './detail-table.component.html',
    styleUrls: ['./detail-table.component.scss'],
})
export class DetailTableComponent implements OnInit {
    table: Tabulator;

    private columns: Tabulator.ColumnDefinition[] = [
        { title: 'Type', field: 'type' },
        { title: 'Code', field: 'code' },
        { title: 'Description', field: 'description' },
        { title: 'Unite', field: 'unit' },
        { title: 'Prix Unitaire', field: 'unit_price' },
        { title: 'Quantite Unitaire', field: 'unit_quantity' },
    ];

    constructor() {}

    ngOnInit(): void {}
}
