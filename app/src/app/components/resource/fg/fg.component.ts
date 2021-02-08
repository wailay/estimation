import { Component, OnInit } from '@angular/core';
import { FgService } from '@app/service/fg/fg.service';
import Tabulator from 'tabulator-tables';

@Component({
    selector: 'app-fg',
    templateUrl: './fg.component.html',
    styleUrls: ['./fg.component.scss'],
})
export class FgComponent implements OnInit {
    type = '';
    data: any[];
    selected: Tabulator.RowComponent;

    constructor(protected fgService: FgService) {
        this.data = [];
    }

    ngOnInit(): void {
        this.getAll();
    }

    getAll(): void {
        this.fgService.getAll().then((data) => {
            this.data = data;
        });
    }
}
