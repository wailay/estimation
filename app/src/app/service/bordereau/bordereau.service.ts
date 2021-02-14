import { Injectable } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Bordereau } from './../../interfaces/models';
import { ElectronService } from './../electron/electron.service';
import { ProjectService } from './../project/project.service';

@Injectable({
    providedIn: 'root',
})
export class BordereauService {
    totalPrice = 0;
    constructor(private electron: ElectronService, private projet: ProjectService, private message: NzMessageService) {
        this.getTotalPrice();
    }

    getWithoutRes(): Promise<any> {
        return this.electron.ipcRenderer.invoke('get-all-b-without-res', this.projet.currentProjectId);
    }

    getAll(): Promise<any> {
        return this.electron.ipcRenderer.invoke('get-all-bordereau', this.projet.currentProjectId);
    }

    recompute(boardId: number): Promise<any> {
        return this.electron.ipcRenderer.invoke('bordereau-recompute', boardId);
    }

    add(bordereau: Bordereau, parent: any): Promise<any> {
        if (!this.projet.currentProjectId) {
            this.message.error('Veuillez selectionner un projet');
            return;
        }
        return this.electron.ipcRenderer.invoke('add-bordereau', bordereau, parent, this.projet.currentProjectId);
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

    async getTotalPrice(): Promise<void> {
        const total = await this.electron.ipcRenderer.invoke('bordereau-total-price');
        this.totalPrice = total;
        return total;
    }
}
