import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ColumnDefinition, RowComponent, TabulatorFull } from 'tabulator-tables';
import { TeamResource } from './../../../../interfaces/models';
import { DialogService } from './../../../../service/dialog/dialog.service';
import { ResourceService } from './../../../../service/resource/resource.service';
import { TeamService } from './../../../../service/team/team.service';
import { TransferTableComponent } from './../../add-team/transfer-table/transfer-table.component';

@Component({
    selector: 'app-team-detail-table',
    templateUrl: './team-detail-table.component.html',
    styleUrls: ['./team-detail-table.component.scss'],
    standalone: false,
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

    table: TabulatorFull;
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

    private columns: ColumnDefinition[] = [
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
        const element = document.getElementById('team-detail-table');
        if (!element) {
            console.log(`Element with id team-detail-table not found`);
            return;
        }

        this.table = new TabulatorFull('#team-detail-table', {
            data: this.data,
            reactiveData: true, // enable data reactivity
            rowContextMenu: this.rowMenu,
            columns: this.columns,
            height: '100%',
            layout: 'fitColumns',
            placeholder: "Aucun detail d'equipe",
        });

        this.table.on('cellDblClick', (e, cell) => {
            if (cell.getField() === 'type') return;
            cell.edit(true);
        });

        this.table.on('cellEdited', (cell) => {
            const resourceId = (cell.getData() as TeamResource).TeamResources.TeamResourceId;
            const teamId = (cell.getData() as TeamResource).TeamResources.TeamId;
            const field = cell.getColumn().getField();
            const value = cell.getValue();
            if (field === 'TeamResources.unit_quantity') {
                this.editTeamQuantity(teamId, resourceId, value);
            } else {
                this.edit(resourceId, field, value);
            }
        });
    }

    edit(id, field, value): void {
        this.resourceService.edit(id, field, value, '').then((res) => {
            if (res.status === 'error') console.log('err', res);

            this.edited.emit();
        });
    }

    editTeamQuantity(teamid, resourceid, value): void {
        this.teamService.editQuantity(teamid, resourceid, value).then((res) => {
            this.edited.emit();
        });
    }

    private openDeleteModal(row): void {
        this.dialogService.openConfirm(this.deleteTeamResource.bind(this), row);
    }

    async deleteTeamResource(row: RowComponent): Promise<void> {
        const data = (row.getData() as TeamResource).TeamResources;
        row.delete();
        await this.teamService.deleteTeamResource(data.TeamId, data.TeamResourceId);
        const newSum = await this.teamService.recomputePrice(data.TeamId);
        this.resourceService.currentSelected.update({ unit_price: newSum });
    }

    async openResourceDialog(): Promise<void> {
        const data = await this.resourceService.getAllTree();
        const modal = this.modal.create({
            nzTitle: 'Ajouter une ressource',
            nzContent: TransferTableComponent,
            nzData: { data },
        });
    }
}
