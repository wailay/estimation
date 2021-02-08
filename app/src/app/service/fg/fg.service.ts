import { Injectable } from '@angular/core';
import { BordereauService } from './../bordereau/bordereau.service';
import { ElectronService } from './../electron/electron.service';

@Injectable({
    providedIn: 'root',
})
export class FgService {
    totalPrice: number;
    profit: number;
    constructor(private electron: ElectronService, private bord: BordereauService) {
        this.totalPrice = 0;
        this.profit = 0;
        this.getTotal();
    }

    getAll(): Promise<any> {
        return this.electron.ipcRenderer.invoke('get-all-fg');
    }

    async getTotal(): Promise<any> {
        const total = await this.electron.ipcRenderer.invoke('get-total-fg');
        this.totalPrice = total;
        return total;
    }

    add(fg: any): Promise<any> {
        return this.electron.ipcRenderer.invoke('add-fg', fg);
    }

    edit(id: number, field: string, value: any): Promise<any> {
        return this.electron.ipcRenderer.invoke('edit-fg', id, field, value);
    }

    delete(id: number): Promise<any> {
        return this.electron.ipcRenderer.invoke('delete-fg', id);
    }

    get percent(): number {
        return parseFloat(((this.totalPrice / this.bord.totalPrice) * 100).toFixed(2));
    }
}
