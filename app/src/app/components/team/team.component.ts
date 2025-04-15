import { Component } from '@angular/core';
import { ResourceService } from '@app/service/resource/resource.service';
import { ResourceComponent } from './../resource/resource.component';
@Component({
    selector: 'app-team',
    templateUrl: './team.component.html',
    styleUrls: ['./team.component.scss'],
    standalone: false,
})
export class TeamComponent extends ResourceComponent {
    type = 'T';

    constructor(protected resourceService: ResourceService) {
        super(resourceService);
        this.getAll(this.type);
    }
}
