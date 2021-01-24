import { Component, OnInit, Input } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import Tabulator from 'tabulator-tables';
import { IResource } from './../../interfaces/models';
import { ResourceService } from './../../service/resource/resource.service';

@Component({
    selector: 'app-lookup',
    templateUrl: './lookup.component.html',
    styleUrls: ['./lookup.component.scss'],
})
export class LookupComponent implements OnInit {
    resourcesData: any[] = [];
    teamData: any[] = [];
    selectedResources: Tabulator.RowComponent[] = [];
    selectedTeams: Tabulator.RowComponent[] = [];
    @Input() withEquipe = true;

    constructor(private resourceService: ResourceService, private modal: NzModalRef) {}

    ngOnInit(): void {
        this.getAllTree();
        this.getTeams();
    }

    getAllTree(): void {
        this.resourceService.getAllTree().then((res) => {
            this.resourcesData = res;
        });
    }

    getTeams(): void {
        this.resourceService.getAll('T').then((res) => {
            this.teamData = res;
        });
    }

    resourceSelected(rows: Tabulator.RowComponent[]): void {
        this.selectedResources = rows;
    }

    teamSelected(rows: Tabulator.RowComponent[]): void {
        this.selectedTeams = rows;
    }

    closeModal(): void {
        this.modal.destroy();
    }
    confirm(): void {
        this.modal.destroy({ selected: [...this.selectedResources, ...this.selectedTeams] });
    }

    selectedAll(): IResource[] {
        const res = this.selectedResources.map((r) => r.getData());
        const teams = this.selectedTeams.map((t) => t.getData());

        return [...res, ...teams];
    }
}
