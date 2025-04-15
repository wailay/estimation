import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { IProject } from './../../interfaces/models';
import { ProjectService } from './../../service/project/project.service';

@Component({
    selector: 'app-project',
    templateUrl: './project.component.html',
    styleUrls: ['./project.component.scss'],
    standalone: false,
})
export class ProjectComponent implements OnInit {
    projectForm = this.fb.group({
        name: ['', Validators.required],
        client: ['', Validators.required],
        date: ['', Validators.required],
    });
    projects: IProject[];
    date = null;
    projectId = undefined;

    constructor(private fb: FormBuilder, public projectService: ProjectService, private message: NzMessageService) {
        this.projects = [];
    }

    ngOnInit(): void {
        this.getAll();
        this.projectId = this.projectService.currentProjectId;
    }

    async addProject(): Promise<void> {
        const result = await this.projectService.add({
            checked: false,
            client: this.projectForm.value.client,
            date: this.projectForm.value.date,
            name: this.projectForm.value.name,
        });
        if (result.status === 'error') {
            this.message.error(result.message);
            return;
        }

        this.projects.push({
            checked: false,
            client: this.projectForm.value.client,
            date: this.projectForm.value.date,
            name: this.projectForm.value.name,
        });
        this.message.success(result.message);
    }

    async getAll(): Promise<void> {
        const result = await this.projectService.getAll();
        this.projects = result.projects;
    }

    selectionChange(): void {
        this.projectService.currentProjectId = this.projectId;
    }

    async deleteProject(id: number): Promise<void> {
        if (id !== this.projectId) {
            this.message.error('Veuillez selectionner un projet avant');
            return;
        }
        this.sliceProject(id);
        const result = await this.projectService.delete(this.projectService.currentProjectId);

        if (result.status === 'error') {
            this.message.error(result.message);
            return;
        }

        this.message.success(result.message);
    }

    sliceProject(id): void {
        this.projects = this.projects.filter((proj) => proj.id !== id);
    }
}
