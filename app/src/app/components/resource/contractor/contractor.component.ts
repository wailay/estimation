import { Component, OnInit } from '@angular/core';
import { ResourceService } from '@app/service/resource/resource.service';
import Tabulator from 'tabulator-tables';

@Component({
    selector: 'app-contractor',
    templateUrl: './contractor.component.html',
    styleUrls: ['./contractor.component.scss'],
})
export class ContractorComponent implements OnInit {
    data: any[];
    selected: Tabulator.RowComponent;

    constructor(private resourceService: ResourceService) {
        this.data = [];
        this.resourceService.getAll('C').then((data) => {
            this.data = data;
        });
    }

    selectedChange(row: Tabulator.RowComponent): void {
        this.selected = row;
    }

    ngOnInit(): void {}
}
