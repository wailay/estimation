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

    // @ViewChild('split') split: SplitComponent;
    // @ViewChild('area1') area1: SplitAreaDirective;
    // @ViewChild('area2') area2: SplitAreaDirective;

    direction = 'horizontal';
    sizes = {
        percent: {
            area1: 30,
            area2: 70,
        },
        pixel: {
            area1: 120,
            area2: '*',
            area3: 160,
        },
    };

    ngOnInit(): void {}

    selectedChange(row: Tabulator.RowComponent): void {
        this.selected = row;
    }

    dragEnd(unit, { sizes }): void {
        if (unit === 'percent') {
            this.sizes.percent.area1 = sizes[0];
            this.sizes.percent.area2 = sizes[1];
        } else if (unit === 'pixel') {
            this.sizes.pixel.area1 = sizes[0];
            this.sizes.pixel.area2 = sizes[1];
            this.sizes.pixel.area3 = sizes[2];
        }
    }
}
