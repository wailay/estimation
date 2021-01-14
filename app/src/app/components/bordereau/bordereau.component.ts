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

    constructor(public bordereauService: BordereauService) {
        this.bordereauService.getAll().then((data) => {
            this.bordereauService.data = data;
        });
    }

    selectedChange(row: Tabulator.RowComponent): void {
        this.selected = row;
    }

    ngOnInit(): void {}
}
