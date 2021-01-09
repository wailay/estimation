import { Injectable } from '@angular/core';
import { IResource } from '@app/interfaces/models';
import { ElectronService } from './../electron/electron.service';

@Injectable({
    providedIn: 'root',
})
export class ResourceService {
    constructor(private electron: ElectronService) {}

    addType(code: string, type: string): Promise<any> {
        return this.electron.ipcRenderer.invoke('add-resource-type', code, type);
    }

    addResource(resource: IResource, parentId: number, type: string): Promise<any> {
        console.log(' adding res', { ...resource, type });
        return this.electron.ipcRenderer.invoke('add-resource', { ...resource, type }, parentId);
    }

    getAll(type: string): Promise<any> {
        return this.electron.ipcRenderer.invoke('get-all', type);
    }

    setField(resourceId: number, field: string, value: any): Promise<any> {
        return this.electron.ipcRenderer.invoke('set-resource-field', resourceId, field, value);
    }

    edit(id: number, field: string, value: any): Promise<any> {
        return this.electron.ipcRenderer.invoke('edit', id, field, value);
    }

    deleteType(typeId: number): Promise<any> {
        return this.electron.ipcRenderer.invoke('delete-type', typeId);
    }
}
