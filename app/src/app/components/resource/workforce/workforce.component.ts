import { Component } from '@angular/core';
import { ResourceService } from './../../../service/resource/resource.service';
import { ResourceComponent } from './../resource.component';

@Component({
    selector: 'app-workforce',
    templateUrl: './workforce.component.html',
    styleUrls: ['./workforce.component.scss', './../resource.component.scss'],
})
export class WorkforceComponent extends ResourceComponent {
    type = 'W';

    constructor(protected resourceService: ResourceService) {
        super(resourceService);
        this.getAll(this.type);
    }
}
