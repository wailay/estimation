import { Component } from '@angular/core';
import { ResourceService } from '@app/service/resource/resource.service';
import { ResourceComponent } from './../resource.component';

@Component({
    selector: 'app-contractor',
    templateUrl: './contractor.component.html',
    styleUrls: ['./contractor.component.scss', './../resource.component.scss'],
})
export class ContractorComponent extends ResourceComponent {
    type = 'C';

    constructor(protected resourceService: ResourceService) {
        super(resourceService);
        this.getAll(this.type);
    }
}
