import { Injectable } from '@angular/core';
import { IProject, Result } from './../../interfaces/models';
import { ElectronService } from './../electron/electron.service';

@Injectable({
    providedIn: 'root',
})
export class ProjectService {
    currentProjectId: number = undefined;
    constructor(private electron: ElectronService) {}

    add(project: IProject): Promise<Result> {
        return this.electron.ipcRenderer.invoke('add-project', project);
    }

    getAll(): Promise<Result> {
        return this.electron.ipcRenderer.invoke('get-project');
    }

    delete(parentId): Promise<Result> {
        return this.electron.ipcRenderer.invoke('delete-project', parentId);
    }
}
