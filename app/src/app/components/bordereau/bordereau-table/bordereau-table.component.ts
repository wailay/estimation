import { Bordereau } from './../../../interfaces/models';
import { TeamLookupComponent } from './../../lookup/team-lookup/team-lookup.component';
import { NzMessageService } from 'ng-zorro-antd/message';
import { BordereauDialogComponent } from './../../../components/bordereau/bordereau-dialog/bordereau-dialog.component';
import { BordereauService } from './../../../service/bordereau/bordereau.service';
import { ResourceDialogComponent } from './../../resource/dialogs/resource-dialog/resource-dialog.component';
import { TypeDialogComponent } from './../../resource/dialogs/type-dialog/type-dialog.component';
import { DialogService } from '@app/service/dialog/dialog.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ResourceService } from './../../../service/resource/resource.service';
import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import Tabulator from 'tabulator-tables';
import { Router } from '@angular/router';

@Component({
    selector: 'app-bordereau-table',
    templateUrl: './bordereau-table.component.html',
    styleUrls: ['./bordereau-table.component.scss'],
})
export class BordereauTableComponent implements OnChanges {
    @Input() data: any[] = [];
    @Output() selected: EventEmitter<Tabulator.RowComponent> = new EventEmitter();
    selectedRow: Tabulator.RowComponent;

    table: Tabulator;
    rowMenu = [
        {
            label: 'Ajouter un sous item',
            action: (e, row) => {
                this.openItemForm(row);
            },
            disabled: (comp) => {
                return comp.getData().unit;
            },
        },
        {
            label: 'Supprimer',
            action: (e, row) => {
                this.openDeleteModal(row);
            },
        },
    ];

    private headerMenu = [
        {
            label: 'Nouvel item',
            action: () => {
                this.openItemForm(null);
            },
        },
    ];

    private columns: Tabulator.ColumnDefinition[] = [
        {
            title: 'Numero',
            field: 'numero',
            headerMenu: this.headerMenu,
            editor: 'input',
            editable: false,
            formatter: this.boldFormatter,
        },
        {
            title: 'Description',
            field: 'description',
            editor: 'input',
            editable: false,
            formatter: this.boldFormatter,
        },
        { title: 'Quantite', field: 'quantity', editor: 'input', editable: false },
        { title: 'Unite', field: 'unit', editor: 'input', editable: false },
        { title: 'Production', field: 'production', editor: 'input', editable: false },
        { title: 'Duree', field: 'duration', editor: 'number', editable: false },
        { title: 'Total', field: 'total_price', editor: 'number', editable: false, formatter: 'money' },
    ];
    constructor(
        private bordereauService: BordereauService,
        private modal: NzModalService,
        private dialogService: DialogService,
        private message: NzMessageService,
        private router: Router,
    ) {}

    private boldFormatter(c, p): string {
        const value = c.getValue();
        if ((c.getData() as Bordereau).BordereauId) return value;

        return `<span style='font-weight:bold;'>` + value + '</span>';
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.drawTable();
    }

    private drawTable(): void {
        this.table = new Tabulator('#bordereau-table', {
            data: this.data,
            reactiveData: true, // enable data reactivity
            rowContextMenu: this.rowMenu,
            columns: this.columns,
            layout: 'fitColumns',
            height: '100%',
            dataTree: true,
            dataTreeElementColumn: 'description',
            dataTreeStartExpanded: true,
            dataTreeChildField: 'children',
            selectable: true,
            selectableRollingSelection: true,
            selectableRangeMode: 'click',
            placeholder: 'Bordereau vide',
            cellDblClick: (e, cell) => {
                cell.edit(true);
            },
            cellEdited: (cell) => {
                const id = (cell.getData() as any).id;
                const field = cell.getColumn().getField();
                const value = cell.getValue();

                this.edit(id, field, value);
            },
            rowClick: (e: MouseEvent, row) => {
                if (e.shiftKey) {
                    return;
                }

                if (!row.getData().unit) {
                    row.deselect();
                    return;
                }

                this.selected.emit(row);
            },
        });
    }

    private openItemForm(row: Tabulator.RowComponent): void {
        const modal = this.modal.create({
            nzTitle: 'Ajouter un item',
            nzContent: BordereauDialogComponent,
        });

        console.log(row);
        const parent = row ? row.getData().id : null;
        modal.afterClose.subscribe((travail) => {
            if (!travail) return;
            this.bordereauService.add(travail.numero, travail.description, parent).then((res) => {
                if (res.status === 'error') {
                    this.message.error('Cet item existe deja');
                    return;
                } else {
                    if (parent) {
                        row.getData().children.push({
                            id: res.id,
                            numero: travail.numero,
                            description: travail.description,
                            unit: travail.unit,
                            quantity: travail.quantity,
                            children: [],
                            BordereauId: parent,
                        });
                    } else {
                        console.log(res);
                        this.table.addData([
                            {
                                id: res.id,
                                numero: travail.numero,
                                description: travail.description,
                                unit: travail.unit,
                                quantity: travail.quantity,
                                children: [],
                            },
                        ]);
                    }
                    this.table.redraw();
                }
            });
        });
    }

    private openResourceForm(row): void {
        // const modal = this.modal.create({
        //     nzTitle: 'Ajouter une ressource',
        //     nzContent: ResourceDialogComponent,
        // });
        // const parentId = row ? row.getData().id : row;
        // modal.afterClose.subscribe((resource) => {
        //     if (!resource) return;
        //     this.bordereauService.add(resource, parentId, 'M').then((res) => {
        //         console.log(res);
        //         if (res.status === 'error') return;
        //         if (parentId) {
        //             console.log(res.resource);
        //             row.getData().children.push(res.resource);
        //         } else {
        //             this.table.addData({ ...res.resource });
        //         }
        //         this.table.redraw();
        //     });
        // });
    }

    private openDeleteModal(row): void {
        this.dialogService.openConfirm(this.deleteType.bind(this), row);
    }

    private openAffectation(): void {
        this.router.navigate(['affectation']);
    }

    edit(id, field, value): void {
        this.bordereauService.edit(id, field, value).then((res) => {
            console.log('edit ed! ', res);
        });
    }

    deleteType(row): void {
        const selectedRows = this.table.getSelectedRows();

        if (!selectedRows.length) {
            selectedRows.push(row);
        }

        selectedRows.forEach((rows: Tabulator.RowComponent) => {
            rows.delete();
            this.bordereauService.delete(rows.getData().id).then((res) => {
                console.log('delete', res);
            });
        });
    }
}
