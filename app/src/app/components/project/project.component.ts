import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Tabulator } from 'tabulator-tables';
import { IProject } from './../../interfaces/models';
import { ProjectService } from './../../service/project/project.service';

@Component({
    selector: 'app-project',
    templateUrl: './project.component.html',
    styleUrls: ['./project.component.scss'],
})
export class ProjectComponent implements OnChanges {
    projectForm = this.fb.group({
        name: ['', Validators.required],
        client: ['', Validators.required],
        date: ['', Validators.required],
    });
    alertOpen: boolean;
    alertMessage: string;
    projects: IProject[];

    table1: Tabulator;
    table2: Tabulator;

    constructor(private fb: FormBuilder, private projectService: ProjectService) {
        this.alertOpen = false;
        this.alertMessage = '';
        this.projects = [];
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.table1 = new Tabulator('#table-one', {
            height: 311,
            layout: 'fitColumns',
            movableRows: true,
            movableRowsConnectedTables: '#table-two',
            movableRowsReceiver: 'add',
            placeholder: 'All Rows Moved',
            data: [{ title: 'allo', name: 'Bob' }],
            columns: [{ title: 'Name', field: 'name' }],
        });

        // Table to move rows to
        this.table2 = new Tabulator('#table-two', {
            height: 311,
            layout: 'fitColumns',
            placeholder: 'Drag Rows Here',
            data: [],
            columns: [{ title: 'Name', field: 'name' }],
        });
    }

    onProjectSubmit(): void {
        this.projectService.add(this.projectForm.value as IProject).then((response) => {
            this.alertOpen = true;
            this.alertMessage = response.message;
        });
    }

    getProjects(): void {
        this.projectService.getAll().then((res) => {
            this.projects = res.projects;
            console.log('all', this.projects);
        });
    }

    onSelect(project: IProject): void {
        console.log('selected', project);
    }

    open(content): void {
        // this.dialog.open(content);
    }
}
