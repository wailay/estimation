import { Injectable } from '@angular/core';
import { IResource } from '@app/interfaces/models';
import { Observable, Subject } from 'rxjs';
import { RowComponent } from 'tabulator-tables';
import { ElectronService } from './../electron/electron.service';

@Injectable({
    providedIn: 'root',
})
export class ResourceService {
    private selected: Subject<RowComponent>;
    currentSelected: RowComponent;

    constructor(private electron: ElectronService) {
        this.selected = new Subject();
    }

    addFolder(code: string, type: string): Promise<any> {
        return this.electron.ipcRenderer.invoke('add-resource-folder', code, type);
    }

    addResource(resource: IResource, parentId: number, type: string): Promise<any> {
        return this.electron.ipcRenderer.invoke('add-resource', { ...resource, type }, parentId);
    }

    getAll(type: string): Promise<any> {
        return this.electron.ipcRenderer.invoke('get-all', type);
    }

    getAllTree(): Promise<any> {
        return this.electron.ipcRenderer.invoke('get-all-tree');
    }

    setField(resourceId: number, field: string, value: any): Promise<any> {
        return this.electron.ipcRenderer.invoke('set-resource-field', resourceId, field, value);
    }

    edit(id: number, field: string, value: any, resType: string): Promise<any> {
        return this.electron.ipcRenderer.invoke('edit', id, field, value, resType);
    }

    delete(id: number): Promise<any> {
        return this.electron.ipcRenderer.invoke('delete-resource', id);
    }

    readFile(): Promise<any> {
        return this.electron.ipcRenderer.invoke('read-file');
    }

    getSelected(): Observable<RowComponent> {
        return this.selected.asObservable();
    }

    select(row: RowComponent): void {
        this.selected.next(row);
        this.currentSelected = row;
    }
}
