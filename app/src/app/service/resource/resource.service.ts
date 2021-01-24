import { Subject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { IResource } from '@app/interfaces/models';
import { ElectronService } from './../electron/electron.service';
import Tabulator from 'tabulator-tables';

@Injectable({
    providedIn: 'root',
})
export class ResourceService {
    private selected: Subject<Tabulator.RowComponent>;
    currentSelected: Tabulator.RowComponent;

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

    edit(id: number, field: string, value: any): Promise<any> {
        return this.electron.ipcRenderer.invoke('edit', id, field, value);
    }

    delete(id: number): Promise<any> {
        return this.electron.ipcRenderer.invoke('delete-resource', id);
    }

    getSelected(): Observable<Tabulator.RowComponent> {
        return this.selected.asObservable();
    }

    select(row: Tabulator.RowComponent): void {
        this.selected.next(row);
        this.currentSelected = row;
    }
}
