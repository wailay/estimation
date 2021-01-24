import { Component, OnInit } from '@angular/core';
import Tabulator from 'tabulator-tables';
import { Bordereau } from './../../interfaces/models';
import { BordereauService } from './../../service/bordereau/bordereau.service';

@Component({
    selector: 'app-bordereau-resource',
    templateUrl: './bordereau-resource.component.html',
    styleUrls: ['./bordereau-resource.component.scss'],
})
export class BordereauResourceComponent implements OnInit {
    selected: Tabulator.RowComponent;
    data: Bordereau[] = [];
    constructor(public bordereauService: BordereauService) {
        this.bordereauService.getAll().then((data: Bordereau[]) => {
            this.data = data;
        });
    }

    selectedChange(row: Tabulator.RowComponent): void {
        this.selected = row;
    }

    ngOnInit(): void {}
}
