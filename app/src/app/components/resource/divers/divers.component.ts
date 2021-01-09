import { ResourceService } from './../../../service/resource/resource.service';
import { Component, OnInit } from '@angular/core';
import Tabulator from 'tabulator-tables';

@Component({
    selector: 'app-divers',
    templateUrl: './divers.component.html',
    styleUrls: ['./divers.component.scss'],
})
export class DiversComponent implements OnInit {
    data: any[];
    selected: Tabulator.RowComponent;

    constructor(private resourceService: ResourceService) {
        this.data = [];
        this.resourceService.getAll('D').then((data) => {
            this.data = data;
        });
    }

    selectedChange(row: Tabulator.RowComponent): void {
        this.selected = row;
    }

    ngOnInit(): void {}
}
