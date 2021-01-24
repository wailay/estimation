import { Bordereau } from './../../interfaces/models';
import { Component, OnInit } from '@angular/core';
import Tabulator from 'tabulator-tables';
import { BordereauService } from './../../service/bordereau/bordereau.service';

@Component({
    selector: 'app-bordereau',
    templateUrl: './bordereau.component.html',
    styleUrls: ['./bordereau.component.scss'],
})
export class BordereauComponent implements OnInit {
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
