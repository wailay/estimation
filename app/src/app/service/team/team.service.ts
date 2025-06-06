import { Injectable } from '@angular/core';
import { ElectronService } from '../electron/electron.service';

@Injectable({
    providedIn: 'root',
})
export class TeamService {
    constructor(private electron: ElectronService) {}

    recomputePrice(teamId: number): Promise<any> {
        return this.electron.ipcRenderer.invoke('team-compute-unit-price', teamId);
    }

    getTeamResource(teamId: number): Promise<any> {
        return this.electron.ipcRenderer.invoke('get-team-resource', teamId);
    }

    addTeamResource(teamId: number, resourceId: number): Promise<any> {
        return this.electron.ipcRenderer.invoke('add-team-resource', teamId, resourceId);
    }

    editQuantity(teamId: number, resourceId: number, quantity: number): Promise<any> {
        return this.electron.ipcRenderer.invoke('edit-team-quantity', teamId, resourceId, quantity);
    }

    deleteTeamResource(teamId: number, resourceId: number): Promise<any> {
        return this.electron.ipcRenderer.invoke('delete-team-resource', teamId, resourceId);
    }
}
