import { Component } from '@angular/core';
import { ResourceService } from '@app/service/resource/resource.service';
import { ResourceComponent } from './../resource.component';

@Component({
    selector: 'app-vrac',
    templateUrl: './vrac.component.html',
    styleUrls: ['./vrac.component.scss'],
    standalone: false,
})
export class VracComponent extends ResourceComponent {
    type = 'V';

    constructor(protected resourceService: ResourceService) {
        super(resourceService);
        this.getAll(this.type);
    }
}
