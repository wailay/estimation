import { ResourceService } from './../../../service/resource/resource.service';
import { Component, OnInit } from '@angular/core';
import Tabulator from 'tabulator-tables';

@Component({
    selector: 'app-material',
    templateUrl: './material.component.html',
    styleUrls: ['./material.component.scss'],
})
export class MaterialComponent implements OnInit {
    data: any[];
    selected: Tabulator.RowComponent;

    constructor(private resourceService: ResourceService) {
        this.data = [];
        this.resourceService.getAll('M').then((data) => {
            this.data = data;
        });
    }

    selectedChange(row: Tabulator.RowComponent): void {
        this.selected = row;
    }

    ngOnInit(): void {}
}
