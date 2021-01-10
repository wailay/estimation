import { IResource } from './../../../interfaces/models';
import { TeamService } from './../../../service/team/team.service';
import { Component, OnInit, Input } from '@angular/core';
import Tabulator from 'tabulator-tables';

@Component({
    selector: 'app-team-detail',
    templateUrl: './team-detail.component.html',
    styleUrls: ['./team-detail.component.scss'],
})
export class TeamDetailComponent implements OnInit {
    @Input() selected: Tabulator.RowComponent;
    data: any[];
    totalPrice: number;

    constructor(private teamService: TeamService) {
        this.data = [];
    }

    ngOnInit(): void {
        this.teamService.getSelected().subscribe((selected) => {
            this.selected = selected;
            this.totalPrice = this.team.unit_price;
            this.getTeamResource(this.selected.getData().id);
        });
    }

    get team(): IResource {
        return this.selected ? this.selected.getData() : {};
    }

    get disabled(): boolean {
        return this.selected ? false : true;
    }

    getTeamResource(id): void {
        this.teamService.getTeamResource(id).then((res) => {
            console.log(' got team', res);
            this.data = res;
        });
    }

    resourceEdited(): void {
        console.log('compute');
        this.teamService.recomputePrice(this.team.id).then((sum) => {
            console.log('new sum', sum);
            this.totalPrice = sum;
        });
    }
}
