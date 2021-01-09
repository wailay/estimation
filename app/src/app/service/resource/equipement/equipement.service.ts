import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import Tabulator from 'tabulator-tables';
import { IResource } from './../../../interfaces/models';
import { ElectronService } from './../../electron/electron.service';

@Injectable({
    providedIn: 'root',
})
export class EquipementService {
    selected: Subject<Tabulator.RowComponent>;
    constructor(private electron: ElectronService) {
        this.selected = new Subject();
    }

    addEquipementDetail(equipementId: number, resourceId: number): Promise<any> {
        return this.electron.ipcRenderer.invoke('add-equipement-detail', equipementId, resourceId);
    }

    editDetailQuantity(id: number, quantity: number): Promise<any> {
        return this.electron.ipcRenderer.invoke('edit-detail-quantity', id, quantity);
    }

    getDetails(equipementId: number): Promise<any> {
        return this.electron.ipcRenderer.invoke('get-details', equipementId);
    }

    getSelected(): Observable<Tabulator.RowComponent> {
        return this.selected.asObservable();
    }
}
