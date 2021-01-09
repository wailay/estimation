import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import Tabulator from 'tabulator-tables';
import { Position, ResourceType } from './../../interfaces/models';
import { ResourceService } from './../../service/resource/resource.service';
@Component({
    selector: 'app-resource',
    templateUrl: './resource.component.html',
    styleUrls: ['./resource.component.scss'],
})
export class ResourceComponent implements OnInit {
    constructor(private fb: FormBuilder, private resourceService: ResourceService) {
        this.types = [];
        // this.getTypes();
        this.showMenu = false;
        this.menu = { x: 0, y: 0 };
        this.data = [];
    }
    types: ResourceType[];
    menu: Position;
    showMenu: boolean;
    rightClickedType: ResourceType;
    selected: Tabulator.RowComponent;
    data: [];

    ngOnInit(): void {}

    selectedChange(row: Tabulator.RowComponent): void {
        this.selected = row;
    }
}
