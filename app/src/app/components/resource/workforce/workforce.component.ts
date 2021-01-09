import { ResourceService } from './../../../service/resource/resource.service';
import { Component, OnInit } from '@angular/core';
import Tabulator from 'tabulator-tables';

@Component({
    selector: 'app-workforce',
    templateUrl: './workforce.component.html',
    styleUrls: ['./workforce.component.scss'],
})
export class WorkforceComponent implements OnInit {
    data: any[];
    selected: Tabulator.RowComponent;

    constructor(private resourceService: ResourceService) {
        this.data = [];
        this.resourceService.getAll('W').then((data) => {
            console.log('getting all for workforce', data);
            this.data = data;
        });
    }

    selectedChange(row: Tabulator.RowComponent): void {
        this.selected = row;
    }

    ngOnInit(): void {}
}
