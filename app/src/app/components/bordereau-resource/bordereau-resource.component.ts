import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { RowComponent } from 'tabulator-tables';
import { Bordereau } from './../../interfaces/models';
import { BordereauService } from './../../service/bordereau/bordereau.service';
import { ProjectService } from './../../service/project/project.service';

@Component({
    selector: 'app-bordereau-resource',
    templateUrl: './bordereau-resource.component.html',
    styleUrls: ['./bordereau-resource.component.scss'],
})
export class BordereauResourceComponent implements OnInit {
    selected: RowComponent;
    data: Bordereau[] = [];
    constructor(public bordereauService: BordereauService, public projet: ProjectService, public message: NzMessageService, public route: Router) {
        if (!projet.currentProjectId) {
            message.error('Veuillez selectionner un projet');
            route.navigate(['/project']);
        } else {
            this.bordereauService.getAll().then((data: Bordereau[]) => {
                this.data = data;
            });
        }
    }

    selectedChange(row: RowComponent): void {
        this.selected = row;
    }

    ngOnInit(): void {}
}
