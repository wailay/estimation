import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FgService } from '@app/service/fg/fg.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import Tabulator from 'tabulator-tables';
import { ProjectService } from './../../../service/project/project.service';

@Component({
    selector: 'app-fg-bordereau',
    templateUrl: './fg-bordereau.component.html',
    styleUrls: ['./fg-bordereau.component.scss'],
})
export class FgBordereauComponent implements OnInit {
    type = '';
    data: any[];
    selected: Tabulator.RowComponent;

    constructor(protected fgService: FgService, private projet: ProjectService, private route: Router, private message: NzMessageService) {
        this.data = [];
        if (!projet.currentProjectId) {
            message.error('Veuillez selectionner un projet');
            this.route.navigate(['/project']);
        }
    }

    ngOnInit(): void {
        this.getAll();
    }

    getAll(): void {
        this.fgService.getAll().then((data) => {
            this.data = data;
        });
    }
}
