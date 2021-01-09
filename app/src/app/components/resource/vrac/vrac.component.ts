import { ResourceService } from '@app/service/resource/resource.service';
import { Component, OnInit } from '@angular/core';
import Tabulator from 'tabulator-tables';

@Component({
    selector: 'app-vrac',
    templateUrl: './vrac.component.html',
    styleUrls: ['./vrac.component.scss'],
})
export class VracComponent implements OnInit {
    data: any[];
    selected: Tabulator.RowComponent;

    constructor(private resourceService: ResourceService) {
        this.data = [];
        this.resourceService.getAll('V').then((data) => {
            this.data = data;
        });
    }

    selectedChange(row: Tabulator.RowComponent): void {
        this.selected = row;
    }

    ngOnInit(): void {}
}
