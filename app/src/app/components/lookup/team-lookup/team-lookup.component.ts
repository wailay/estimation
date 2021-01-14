import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ResourceService } from '@app/service/resource/resource.service';
import Tabulator from 'tabulator-tables';

@Component({
    selector: 'app-team-lookup',
    templateUrl: './team-lookup.component.html',
    styleUrls: ['./team-lookup.component.scss'],
})
export class TeamLookupComponent implements OnInit, AfterViewInit {
    data: any[] = [];
    height = '311px';

    tab = document.createElement('div');
    table: Tabulator;

    private columns: Tabulator.ColumnDefinition[] = [
        {
            title: 'Code',
            field: 'code',
        },
        { title: 'Description', field: 'description', editor: 'input', editable: false },
        { title: 'Unite', field: 'unit' },
        { title: 'Prix Unitaire', field: 'unit_price' },
    ];

    constructor(private resourceService: ResourceService) {
        console.log('init');
    }

    async ngOnInit(): Promise<void> {
        this.data = await this.resourceService.getAll('T');
    }
    ngAfterViewInit(): void {
        console.log('vew init');
        this.drawTable();
    }

    private drawTable(): void {
        this.table = new Tabulator(this.tab, {
            data: [],
            reactiveData: true,
            columns: this.columns,
            layout: 'fitData',
            height: this.height,
        });
        document.getElementById('team-lookup-table').appendChild(this.tab);
    }
}
