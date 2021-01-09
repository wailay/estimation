import { Component, Input, OnInit } from '@angular/core';
import Tabulator from 'tabulator-tables';
import { IResource } from './../../../interfaces/models';

@Component({
    selector: 'app-resource-detail',
    templateUrl: './resource-detail.component.html',
    styleUrls: ['./resource-detail.component.scss'],
})
export class ResourceDetailComponent implements OnInit {
    @Input() selected: Tabulator.RowComponent;
    constructor() {}

    ngOnInit(): void {}

    get resource(): IResource {
        return this.selected ? this.selected.getData() : {};
    }
}
