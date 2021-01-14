import { Component } from '@angular/core';
import { ResourceService } from './../../../service/resource/resource.service';
import { ResourceComponent } from './../resource.component';

@Component({
    selector: 'app-equipement',
    templateUrl: './equipement.component.html',
    styleUrls: ['./equipement.component.scss', './../resource.component.scss'],
})
export class EquipementComponent extends ResourceComponent {
    type = 'E';

    constructor(protected resourceService: ResourceService) {
        super(resourceService);
        this.getAll(this.type);
    }
}
