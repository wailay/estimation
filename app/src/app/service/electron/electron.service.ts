import { Injectable } from '@angular/core';
import { ipcRenderer, webFrame } from 'electron';

@Injectable({
    providedIn: 'root',
})
export class ElectronService {
    ipcRenderer: typeof ipcRenderer;
    webFrame: typeof webFrame;

    constructor() {
        this.ipcRenderer = window.require('electron').ipcRenderer;
        this.webFrame = window.require('electron').webFrame;
    }

    // get isElectron(): boolean {
    //     return !!(window && window.process && window.process.type);
    // }
}
