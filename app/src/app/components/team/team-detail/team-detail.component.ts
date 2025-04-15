import { Component, OnInit } from '@angular/core';
import { ResourceService } from '@app/service/resource/resource.service';
import { RowComponent } from 'tabulator-tables';
import { IResource } from './../../../interfaces/models';
import { TeamService } from './../../../service/team/team.service';

@Component({
    selector: 'app-team-detail',
    templateUrl: './team-detail.component.html',
    styleUrls: ['./team-detail.component.scss'],
})
export class TeamDetailComponent implements OnInit {
    data: any[];

    constructor(private teamService: TeamService, private resourceService: ResourceService) {
        this.data = [];
    }

    ngOnInit(): void {
        this.resourceService.getSelected().subscribe((selected) => {
            this.getTeamResource(selected.getData().id);
        });
    }

    get team(): IResource {
        return this.selected ? this.selected.getData() : {};
    }

    get selected(): RowComponent {
        return this.resourceService.currentSelected;
    }

    get totalPrice(): number {
        return this.selected?.getData().unit_price;
    }

    getTeamResource(id): void {
        this.teamService.getTeamResource(id).then((res) => {
            this.data = res;
        });
    }

    resourceEdited(): void {
        this.teamService.recomputePrice(this.team.id).then((sum) => {
            this.resourceService.currentSelected.update({ unit_price: sum });
        });
    }
}
