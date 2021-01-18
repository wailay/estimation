import { Injectable } from '@angular/core';
import { Bordereau } from './../../interfaces/models';
import { ElectronService } from './../electron/electron.service';

@Injectable({
    providedIn: 'root',
})
export class BordereauService {
    data: Bordereau[];
    constructor(private electron: ElectronService) {
        this.data = [];
    }

    getAll(): Promise<any> {
        return this.electron.ipcRenderer.invoke('get-all-bordereau');
    }

    recompute(boardId: number): Promise<any> {
        return this.electron.ipcRenderer.invoke('bordereau-recompute', boardId);
    }

    add(bordereau: Bordereau, parent: any): Promise<any> {
        return this.electron.ipcRenderer.invoke('add-bordereau', bordereau, parent);
    }

    affect(resources: any[], parent: number): Promise<any> {
        return this.electron.ipcRenderer.invoke('affect-bordereau', resources, parent);
    }

    edit(id: number, field: string, value: any): Promise<any> {
        return this.electron.ipcRenderer.invoke('edit-bordereau', id, field, value);
    }

    editBR(bordId: number, resId: number, field: string, value: any): Promise<any> {
        return this.electron.ipcRenderer.invoke('edit-bordereau-resource', bordId, resId, field, value);
    }

    delete(id: number): Promise<any> {
        return this.electron.ipcRenderer.invoke('delete-bordereau', id);
    }

    deleteRes(bordId: number, resId: number): Promise<any> {
        return this.electron.ipcRenderer.invoke('delete-bordereau-resource', bordId, resId);
    }

    get empty(): boolean {
        return this.data.length === 0;
    }
}
