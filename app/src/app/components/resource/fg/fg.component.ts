import { Component } from '@angular/core';
import { ResourceService } from '@app/service/resource/resource.service';
import { ResourceComponent } from '../resource.component';

@Component({
    selector: 'app-fg',
    templateUrl: './fg.component.html',
    styleUrls: ['./fg.component.scss'],
})
export class FgComponent extends ResourceComponent {
    type = 'FG';

    constructor(protected resourceService: ResourceService) {
        super(resourceService);
        this.getAll(this.type);
    }
}
