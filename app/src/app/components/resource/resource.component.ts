import { Component, OnInit } from '@angular/core';
import Tabulator from 'tabulator-tables';
import { ResourceService } from './../../service/resource/resource.service';
@Component({
    selector: 'app-resource',
    templateUrl: './resource.component.html',
    styleUrls: ['./resource.component.scss'],
})
export class ResourceComponent implements OnInit {
    type = '';
    data: any[];
    selected: Tabulator.RowComponent;

    constructor(protected resourceService: ResourceService) {
        this.data = [];
    }

    getAll(type: string): void {
        this.resourceService.getAll(type).then((data) => {
            this.data = data;
        });
    }

    selectedChange(row: Tabulator.RowComponent): void {
        this.selected = row;
    }

    ngOnInit(): void {}
}
