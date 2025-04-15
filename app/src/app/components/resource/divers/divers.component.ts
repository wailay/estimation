import { Component } from '@angular/core';
import { ResourceService } from './../../../service/resource/resource.service';
import { ResourceComponent } from './../resource.component';

@Component({
    selector: 'app-divers',
    templateUrl: './divers.component.html',
    styleUrls: ['./divers.component.scss', './../resource.component.scss'],
    standalone: false,
})
export class DiversComponent extends ResourceComponent {
    type = 'D';

    constructor(protected resourceService: ResourceService) {
        super(resourceService);
        this.getAll(this.type);
    }
}
