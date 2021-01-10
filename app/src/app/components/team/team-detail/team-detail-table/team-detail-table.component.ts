import { NzModalService } from 'ng-zorro-antd/modal';
import { TransferTableComponent } from './../../add-team/transfer-table/transfer-table.component';
import { DialogService } from './../../../../service/dialog/dialog.service';
import { ResourceService } from './../../../../service/resource/resource.service';
import { TeamService } from './../../../../service/team/team.service';
import { IResource, TeamResource } from './../../../../interfaces/models';
import { Component, Input, OnInit, SimpleChanges, OnChanges, EventEmitter, Output } from '@angular/core';
import Tabulator from 'tabulator-tables';

@Component({
    selector: 'app-team-detail-table',
    templateUrl: './team-detail-table.component.html',
    styleUrls: ['./team-detail-table.component.scss'],
})
export class TeamDetailTableComponent implements OnChanges {
    constructor(
        private teamService: TeamService,
        private resourceService: ResourceService,
        private dialogService: DialogService,
        private modal: NzModalService,
    ) {}
    @Input() data: any[];
    @Output() edited: EventEmitter<void> = new EventEmitter();

    table: Tabulator;
    rowMenu = [
        {
            label: 'Supprimer',
            action: (e, row) => {
                this.openDeleteModal(row);
            },
        },
    ];

    private headerMenu = [
        {
            label: 'Ajouter une ressource',
            action: async () => {
                await this.openResourceDialog();
            },
        },
    ];

    private columns: Tabulator.ColumnDefinition[] = [
        { title: 'Type', field: 'type', editor: 'input', editable: false },
        { title: 'Code', field: 'code', editor: 'input', editable: false, headerMenu: this.headerMenu },
        { title: 'Description', field: 'description', editor: 'input', editable: false },
        { title: 'Unite', field: 'unit', editor: 'input', editable: false },
        { title: 'Prix Unitaire', field: 'unit_price', editor: 'number', editable: false },
        { title: 'Quantite Unitaire', field: 'TeamResources.unit_quantity', editor: 'number', editable: false },
    ];

    ngOnChanges(changes: SimpleChanges): void {
        this.drawTable();
    }

    // addEquipementDetail(equipementId: number, resourceId: number): void {
    //     this.equipementService.addEquipementDetail(equipementId, resourceId).then((res) => {
    //         console.log('add equipement detail', res);
    //     });
    // }

    private drawTable(): void {
        this.table = new Tabulator('#team-detail-table', {
            data: this.data,
            reactiveData: true, // enable data reactivity
            rowContextMenu: this.rowMenu,
            columns: this.columns,
            height: '100%',
            placeholder: "Aucun detail d'equipe",
            cellDblClick: (e, cell) => {
                if (cell.getField() === 'type') return;
                cell.edit(true);
            },
            cellEdited: (cell) => {
                const resourceId = (cell.getData() as TeamResource).TeamResources.ResourceId;
                const teamId = (cell.getData() as TeamResource).TeamResources.TeamId;
                const field = cell.getColumn().getField();
                const value = cell.getValue();
                console.log(cell.getRow().getData());
                if (field === 'TeamResources.unit_quantity') {
                    this.editTeamQuantity(teamId, resourceId, value);
                } else {
                    this.edit(resourceId, field, value);
                }
            },
        });
    }

    edit(id, field, value): void {
        this.resourceService.edit(id, field, value).then((res) => {
            if (res.status === 'error') console.log('err', res);

            this.edited.emit();
        });
    }

    editTeamQuantity(teamid, resourceid, value): void {
        this.teamService.editQuantity(teamid, resourceid, value).then((res) => {
            console.log('quant edited', res);
            this.edited.emit();
        });
    }

    private openDeleteModal(row): void {
        this.dialogService.openConfirm(this.deleteTeamResource.bind(this), row);
    }

    deleteTeamResource(row): void {
        const data = (row.getData() as TeamResource).TeamResources;
        row.delete();
        this.teamService.deleteTeamResource(data.TeamId, data.ResourceId).then((res) => {
            console.log('delete team resources', res);
        });
    }

    async openResourceDialog(): Promise<void> {
        const data = await this.resourceService.getAllTree();
        console.log('add', data);
        const modal = this.modal.create({
            nzTitle: 'Ajouter une ressource',
            nzContent: TransferTableComponent,
            nzComponentParams: { data },
        });
    }
}
