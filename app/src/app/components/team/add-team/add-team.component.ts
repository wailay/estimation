import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ResourceService } from '@app/service/resource/resource.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import Tabulator from 'tabulator-tables';
import { TeamService } from './../../../service/team/team.service';

@Component({
    selector: 'app-add-team',
    templateUrl: './add-team.component.html',
    styleUrls: ['./add-team.component.scss'],
})
export class AddTeamComponent implements OnInit {
    teamForm = this.fb.group({
        code: ['', Validators.required],
        description: ['', Validators.required],
        unit: ['', Validators.required],
        production: ['', Validators.required],
    });

    data: any[] = [];
    selected: Tabulator.RowComponent[];
    parentId: number;

    constructor(
        private fb: FormBuilder,
        private resourceService: ResourceService,
        private teamService: TeamService,
        private message: NzMessageService,
        private route: ActivatedRoute,
    ) {
        this.selected = [];
    }

    ngOnInit(): void {
        this.getAllTree();
        this.route.queryParams.subscribe((params) => {
            this.parentId = params.parentId ? params.parentId : null;
        });
    }

    getAllTree(): void {
        this.resourceService.getAllTree().then((res) => {
            console.log('resss tree', res);
            this.data = res;
        });
    }

    selectionChange(items: Tabulator.RowComponent[]): void {
        this.selected = items;
    }

    get disabled(): boolean {
        return this.selected.length === 0;
    }

    async addEquipe(): Promise<void> {
        let sum = 0;
        if (this.selected.length) {
            sum = this.computeTotalPrice();
        }
        console.log(sum);
        const result = await this.resourceService.addResource({ ...this.teamForm.value, unit_price: sum }, this.parentId, 'T');
        console.log('returned result', result);
        if (result.status === 'error') {
            this.message.error(result.message);
            return;
        }

        if (result.status === 'success' && this.selected.length) {
            this.selected.forEach(async (row) => {
                console.log('adding ', row.getData());
                await this.teamService.addTeamResource(result.resource.id, row.getData().id);
            });
        }

        this.message.success(result.message);
    }

    computeTotalPrice(): number {
        let sum = 0;
        this.selected.forEach((row) => {
            sum += row.getData().unit_price;
        });

        return sum;
    }
}
