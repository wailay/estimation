import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ColumnDefinition, RowComponent, TabulatorFull } from 'tabulator-tables';
import { IResource } from './../../../../../interfaces/models';
import { EquipementService } from './../../../../../service/resource/equipement/equipement.service';

@Component({
    selector: 'app-equipement-detail-table',
    templateUrl: './equipement-detail-table.component.html',
    styleUrls: ['./equipement-detail-table.component.scss'],
    standalone: false,
})
export class EquipementDetailTableComponent implements OnChanges, AfterViewInit, OnInit {
    constructor(private equipementService: EquipementService) {}
    @Input() data: any[];
    @Input() disabled: boolean;
    resource: IResource;

    table: TabulatorFull;

    private headerMenu = [
        {
            label: 'Ajouter une ressource',
            action: () => {
                // this.openResourceForm(null);
            },
        },
        {
            label: 'Supprimer',
            action: () => {
                // this.openTypeForm(null);
            },
        },
    ];

    private columns: ColumnDefinition[] = [
        {
            title: 'Type',
            field: 'type',
        },
        {
            title: 'Code',
            field: 'code',
            headerMenu: this.headerMenu,
            editable: false,
        },
        { title: 'Description', field: 'description', editable: false },
        { title: 'Unite', field: 'unit', editable: false },
        { title: 'Prix Unitaire', field: 'unit_price', editable: false },
        { title: 'Quantite Unitaire', field: 'unit_quantity', editor: 'number', editable: false },
    ];

    customReceiver(fromRow: RowComponent, toRow, fromTable): boolean {
        if (this.disabled) return false;

        if (!fromRow.getData().unit) return false;
        const found = this.table.getRows().find((row) => row.getData().id === fromRow.getData().id);

        if (!found) {
            this.table.addData([{ ...fromRow.getData(), unit_quantity: 1 }]);
            this.addEquipementDetail(this.resource.id, fromRow.getData().id);
        }

        return true;
    }

    ngOnInit(): void {
        this.equipementService.getSelected().subscribe(async (selected) => {
            this.resource = selected.getData();
            this.data = await this.equipementService.getDetails(this.resource.id);
            this.drawTable();
        });
    }

    ngAfterViewInit(): void {
        this.drawTable();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (this.table) this.table.setData(this.data);
    }

    addEquipementDetail(equipementId: number, resourceId: number): void {
        this.equipementService.addEquipementDetail(equipementId, resourceId).then((res) => {});
    }

    private drawTable(): void {
        const element = document.getElementById('equipement-detail-table');
        if (!element) {
            console.log(`Element with id equipement-detail-table not found`);
            return;
        }

        this.table = new TabulatorFull('#equipement-detail-table', {
            data: this.data,
            reactiveData: true, // enable data reactivity
            rowContextMenu: [],
            columns: this.columns,
            height: '100%',
            dataTreeChildField: 'children',
            dataTree: true,
            dataTreeStartExpanded: true,
            selectableRows: true,
            selectableRowsRollingSelection: true,
            selectableRowsRangeMode: 'click',
            placeholder: 'Aucun detail de ressource',
            movableRowsReceiver: this.customReceiver.bind(this),
            // movableRowsReceived: this.customReceiver,
        });

        this.table.on('cellDblClick', (e, cell) => {
            if (cell.getField() !== 'unit_quantity') return;
            cell.edit(true);
        });

        this.table.on('cellEdited', (cell) => {
            const id = (cell.getData() as any).id;
            const field = cell.getColumn().getField();
            const value = cell.getValue();

            // this.edit(id, field, value);
        });
    }
}
