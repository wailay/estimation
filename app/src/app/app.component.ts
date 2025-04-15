import { Component } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: false,
})
export class AppComponent {
    isCollapsed = false;
    title = 'estimation-ayad';

    constructor() {
        console.log(XLSX.version);
    }
}
