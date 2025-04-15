import { Component, OnInit } from '@angular/core';
import { RowComponent } from 'tabulator-tables';
import { ResourceService } from './../../service/resource/resource.service';
@Component({
    selector: 'app-resource',
    templateUrl: './resource.component.html',
    styleUrls: ['./resource.component.scss'],
    standalone: false,
})
export class ResourceComponent implements OnInit {
    type = '';
    data: any[];
    selected: RowComponent;

    constructor(protected resourceService: ResourceService) {
        this.data = [];
    }

    getAll(type: string): void {
        this.resourceService.getAll(type).then((data) => {
            this.data = data;
        });
    }

    selectedChange(row: RowComponent): void {
        // const row = (e.target as HTMLElement).closest('tr');

        this.selected = row;
    }

    ngOnInit(): void {}
}
