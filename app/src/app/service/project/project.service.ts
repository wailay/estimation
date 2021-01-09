import { Injectable } from '@angular/core';
import { IProject } from './../../interfaces/models';
import { ElectronService } from './../electron/electron.service';

@Injectable({
    providedIn: 'root',
})
export class ProjectService {
    constructor(private electron: ElectronService) {}

    add(project: IProject): Promise<any> {
        return this.electron.ipcRenderer.invoke('add-project', project);
    }

    getAll(): Promise<any> {
        return this.electron.ipcRenderer.invoke('get-project');
    }
}
