import { Component, DoCheck, Input, OnInit } from '@angular/core';
import { Tabulator } from 'tabulator-tables';
import { IResource } from './../../../../interfaces/models';
import { ResourceService } from './../../../../service/resource/resource.service';

@Component({
    selector: 'app-equipement-detail',
    templateUrl: './equipement-detail.component.html',
    styleUrls: ['./equipement-detail.component.scss'],
})
export class EquipementDetailComponent implements OnInit, DoCheck {
    @Input() selected: Tabulator.RowComponent;
    priceType = false;
    constructor(private resourceService: ResourceService) {}

    ngOnInit(): void {}

    get resource(): IResource {
        return this.selected ? this.selected.getData() : {};
    }

    get disabled(): boolean {
        return this.selected ? false : true;
    }

    ngDoCheck(): void {
        if (!this.disabled && this.selected.getData().fixed_price !== this.priceType) {
            this.priceType = this.selected.getData().fixed_price;
        }
    }

    fixedPriceChange(change): void {
        const value = change.checked ? true : false;
        this.selected.update({ fixed_price: value });
        this.resourceService.edit(this.resource.id, 'fixed_price', value);
    }
}
