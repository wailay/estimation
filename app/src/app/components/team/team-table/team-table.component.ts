import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService } from '@app/service/dialog/dialog.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import Tabulator from 'tabulator-tables';
import { ResourceService } from './../../../service/resource/resource.service';
import { ResourceTableComponent } from './../../resource/resource-table/resource-table.component';

@Component({
    selector: 'app-team-table',
    templateUrl: './team-table.component.html',
    styleUrls: ['./team-table.component.scss'],
})
export class TeamTableComponent extends ResourceTableComponent implements OnChanges {
    type = 'T';
    tableId = 'team-table';
    @Input() checkbox: boolean;

    rowMenu = [
        {
            label: 'Ajouter une equipe',
            action: (e, row) => {
                this.router.navigate(['team-add'], { queryParams: { parentId: row.getData().id } });
            },
            disabled: (comp) => {
                return comp.getData().unit;
            },
        },
        { separator: true },
        {
            label: 'Affecter une ressource',
            action: (e, row) => {
                this.affectResource(row);
            },
            disabled: (comp) => {
                return !comp.getData().unit;
            },
        },
        { separator: true },
        {
            label: 'Supprimer',
            action: (e, row) => {
                this.openDeleteModal(row);
            },
        },
    ];

    protected headerMenu = [
        {
            label: 'Nouveau dossier',
            action: () => {
                this.openTypeForm(null);
            },
        },
    ];

    protected columns: Tabulator.ColumnDefinition[] = [
        {
            title: '',
            field: 'checkbox',
            formatter: 'rowSelection',
            hozAlign: 'center',
            headerSort: false,
            width: 1,
            cellClick: (e, cell) => {
                cell.getRow().toggleSelect();
            },
            visible: false,
        },
        {
            title: 'Code',
            field: 'code',
            headerMenu: this.headerMenu,

            editor: 'input',
            editable: false,
        },
        { title: 'Description', field: 'description', editor: 'input', editable: false },
        { title: 'Unite', field: 'unit', editor: 'input', editable: false },
        { title: 'Prix Unitaire', field: 'unit_price', editor: 'number', editable: false },
        { title: 'Production', field: 'production', editor: 'number', editable: false },
    ];

    ngOnChanges(changes: SimpleChanges): void {
        super.ngOnChanges(changes);

        if (this.checkbox) this.table.showColumn('checkbox');
    }

    constructor(
        protected resourceService: ResourceService,
        protected modal: NzModalService,
        protected dialogService: DialogService,
        protected message: NzMessageService,
        private router: Router,
    ) {
        super(resourceService, modal, dialogService, message);
    }

    private affectResource(row: Tabulator.RowComponent): void {
        console.log('affecter');
    }
}
