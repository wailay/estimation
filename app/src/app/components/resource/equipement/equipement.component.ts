import { Component, OnInit } from '@angular/core';
import { Tabulator } from 'tabulator-tables';
import { ResourceService } from './../../../service/resource/resource.service';

@Component({
    selector: 'app-equipement',
    templateUrl: './equipement.component.html',
    styleUrls: ['./equipement.component.scss'],
})
export class EquipementComponent implements OnInit {
    data: any[];
    selected: Tabulator.RowComponent;

    constructor(private resourceService: ResourceService) {
        this.data = [];
        this.resourceService.getAll('E').then((data) => {
            console.log('getting all for equipe', data);
            this.data = data;
        });
    }

    selectedChange(row: Tabulator.RowComponent): void {
        this.selected = row;
    }

    ngOnInit(): void {}
}
