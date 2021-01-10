import { Subject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import Tabulator from 'tabulator-tables';
import { ElectronService } from '../electron/electron.service';

@Injectable({
    providedIn: 'root',
})
export class TeamService {
    selected: Subject<Tabulator.RowComponent>;

    constructor(private electron: ElectronService) {
        this.selected = new Subject();
    }

    recomputePrice(teamId: number): Promise<any> {
        return this.electron.ipcRenderer.invoke('team-compute-unit-price', teamId);
    }

    getAll(): Promise<any> {
        return this.electron.ipcRenderer.invoke('get-all-teams');
    }

    getTeamResource(teamId: number): Promise<any> {
        return this.electron.ipcRenderer.invoke('get-team-resource', teamId);
    }

    addTeam(team, total: number): Promise<any> {
        return this.electron.ipcRenderer.invoke('add-team', team, total);
    }

    addTeamResource(teamId: number, resourceId: number): Promise<any> {
        return this.electron.ipcRenderer.invoke('add-team-resource', teamId, resourceId);
    }

    edit(id: number, field: string, value: any): Promise<any> {
        return this.electron.ipcRenderer.invoke('edit-team', id, field, value);
    }

    editQuantity(teamId: number, resourceId: number, quantity: number): Promise<any> {
        return this.electron.ipcRenderer.invoke('edit-team-quantity', teamId, resourceId, quantity);
    }

    delete(teamId: number): Promise<any> {
        return this.electron.ipcRenderer.invoke('delete-team', teamId);
    }

    deleteTeamResource(teamId: number, resourceId: number): Promise<any> {
        return this.electron.ipcRenderer.invoke('delete-team-resource', teamId, resourceId);
    }

    getSelected(): Observable<Tabulator.RowComponent> {
        return this.selected.asObservable();
    }
}
