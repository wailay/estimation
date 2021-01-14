import { ElectronService } from './../electron/electron.service';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class BordereauService {
    data: any[];
    constructor(private electron: ElectronService) {
        this.data = [];
    }

    getAll(): Promise<any> {
        return this.electron.ipcRenderer.invoke('get-all-bordereau');
    }

    add(numero: string, description: string, parent: any): Promise<any> {
        return this.electron.ipcRenderer.invoke('add-bordereau', numero, description, parent);
    }

    edit(id: number, field: string, value: any): Promise<any> {
        return this.electron.ipcRenderer.invoke('edit-bordereau', id, field, value);
    }

    delete(id: number): Promise<any> {
        return this.electron.ipcRenderer.invoke('delete-bordereau', id);
    }

    get empty(): boolean {
        return this.data.length === 0;
    }
}
