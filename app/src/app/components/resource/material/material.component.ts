import { Component } from '@angular/core';
import { ResourceService } from './../../../service/resource/resource.service';
import { ResourceComponent } from './../resource.component';

@Component({
    selector: 'app-material',
    templateUrl: './material.component.html',
    styleUrls: ['./material.component.scss', './../resource.component.scss'],
    standalone: false,
})
export class MaterialComponent extends ResourceComponent {
    type = 'M';

    constructor(protected resourceService: ResourceService) {
        super(resourceService);
        this.getAll(this.type);
    }
}
