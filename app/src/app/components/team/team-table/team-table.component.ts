import { TeamService } from './../../../service/team/team.service';
import { DialogService } from './../../../service/dialog/dialog.service';
import { ResourceService } from './../../../service/resource/resource.service';
import { Component, OnInit, OnChanges, EventEmitter, Output, Input, SimpleChanges } from '@angular/core';
import Tabulator from 'tabulator-tables';

@Component({
    selector: 'app-team-table',
    templateUrl: './team-table.component.html',
    styleUrls: ['./team-table.component.scss'],
})
export class TeamTableComponent implements OnChanges {
    table: Tabulator;
    @Input() data: any[] = [];

    rowMenu = [
        {
            label: 'Supprimer',
            action: (e, row) => {
                this.openDeleteModal(row);
            },
        },
    ];

    private columns: Tabulator.ColumnDefinition[] = [
        {
            title: 'Code',
            field: 'code',

            editor: 'input',
            editable: false,
        },
        { title: 'Description', field: 'description', editor: 'input', editable: false },
        { title: 'Unite', field: 'unit', editor: 'input', editable: false },
        { title: 'Prix Unitaire', field: 'unit_price' },
    ];
    constructor(private dialogService: DialogService, private teamService: TeamService) {}

    ngOnChanges(changes: SimpleChanges): void {
        // if (this.table) this.table.setData(this.data);
        this.drawTable();
    }

    private drawTable(): void {
        this.table = new Tabulator('#team-table', {
            data: this.data,
            reactiveData: true, // enable data reactivity
            rowContextMenu: this.rowMenu,
            columns: this.columns,
            layout: 'fitColumns',
            height: '100%',
            selectable: true,
            selectableRangeMode: 'click',
            selectableRollingSelection: true,
            placeholder: 'Aucune equipe',
            cellDblClick: (e, cell) => {
                if (cell.getField() === 'unit_price') return;
                cell.edit(true);
            },
            cellEdited: (cell) => {
                const id = (cell.getData() as any).id;
                const field = cell.getColumn().getField();
                const value = cell.getValue();

                this.edit(id, field, value);
            },
            rowDblClick: (e, row) => {
                this.teamService.selected.next(row);
            },
        });
    }

    private openDeleteModal(row): void {
        this.dialogService.openConfirm(this.deleteTeam.bind(this), row);
    }

    deleteTeam(row): void {
        const selectedRows = this.table.getSelectedRows();
        if (!selectedRows.length) {
            selectedRows.push(row);
        }
        selectedRows.forEach((rows: Tabulator.RowComponent) => {
            rows.delete();
            this.teamService.delete(rows.getData().id).then((res) => {
                console.log('delete', res);
            });
        });
    }

    edit(id, field, value): void {
        this.teamService.edit(id, field, value).then((res) => {
            console.log('edit ed! ', res);
        });
    }
}
