import { TeamService } from './../../service/team/team.service';
import { ResourceService } from '@app/service/resource/resource.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-team',
    templateUrl: './team.component.html',
    styleUrls: ['./team.component.scss'],
})
export class TeamComponent implements OnInit {
    data: any[];
    constructor(private team: TeamService) {
        this.data = [];
    }

    async ngOnInit(): Promise<void> {
        const data = await this.team.getAll();
        this.data = data;
    }
}
