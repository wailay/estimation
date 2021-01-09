import { Injectable } from '@angular/core';
import { IResource } from '@app/interfaces/models';
import { ElectronService } from './../electron/electron.service';

@Injectable({
    providedIn: 'root',
})
export class ResourceService {
    constructor(private electron: ElectronService) {}

    getTypeChildren(parentId: number): Promise<any> {
        return this.electron.ipcRenderer.invoke('get-type-children', parentId);
    }

    getTypeItems(parentId: number): Promise<any> {
        return this.electron.ipcRenderer.invoke('get-type-items', parentId);
    }

    // getTypes(): Promise<any> {
    //     return this.electron.ipcRenderer.invoke('get-types');
    // }

    getAll(type: string): Promise<any> {
        console.log('getting all');
        return this.electron.ipcRenderer.invoke('get-all', type);
    }

    setField(resourceId: number, field: string, value: any): Promise<any> {
        return this.electron.ipcRenderer.invoke('set-resource-field', resourceId, field, value);
    }

    edit(id: number, field: string, value: any): Promise<any> {
        return this.electron.ipcRenderer.invoke('edit', id, field, value);
    }

    addType(type: string, parentId): Promise<any> {
        return this.electron.ipcRenderer.invoke('add-type', type, parentId);
    }

    deleteType(typeId: number): Promise<any> {
        return this.electron.ipcRenderer.invoke('delete-type', typeId);
    }

    addResource(resource: IResource, parentId: number): Promise<any> {
        return this.electron.ipcRenderer.invoke('add-resource', resource, parentId);
    }
}
