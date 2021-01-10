import { ResourceComponent } from './components/resource/resource.component';
import { TransferTableComponent } from './components/team/add-team/transfer-table/transfer-table.component';
import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import en from '@angular/common/locales/en';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProjectComponent } from './components/project/project.component';
import { ResourceDialogComponent } from './components/resource/dialogs/resource-dialog/resource-dialog.component';
import { TypeDialogComponent } from './components/resource/dialogs/type-dialog/type-dialog.component';
import { EquipementDetailTableComponent } from './components/resource/equipement/equipement-detail/detail-table/equipement-detail-table.component';
import { EquipementDetailComponent } from './components/resource/equipement/equipement-detail/equipement-detail.component';
import { EquipementTableComponent } from './components/resource/equipement/equipement-table/equipement-table.component';
import { EquipementComponent } from './components/resource/equipement/equipement.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { IconsProviderModule } from './icons-provider.module';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { WorkforceComponent } from './components/resource/workforce/workforce.component';
import { WorkforceTableComponent } from './components/resource/workforce/workforce-table/workforce-table.component';
import { MaterialComponent } from './components/resource/material/material.component';
import { VracComponent } from './components/resource/vrac/vrac.component';
import { DiversComponent } from './components/resource/divers/divers.component';
import { ContractorComponent } from './components/resource/contractor/contractor.component';
import { MaterialTableComponent } from './components/resource/material/material-table/material-table.component';
import { VracTableComponent } from './components/resource/vrac/vrac-table/vrac-table.component';
import { DiversTableComponent } from './components/resource/divers/divers-table/divers-table.component';
import { ContractorTableComponent } from './components/resource/contractor/contractor-table/contractor-table.component';
import { TeamComponent } from './components/team/team.component';
import { AddTeamComponent } from './components/team/add-team/add-team.component';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { TeamTableComponent } from './components/team/team-table/team-table.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { TeamDetailComponent } from './components/team/team-detail/team-detail.component';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { TeamDetailTableComponent } from './components/team/team-detail/team-detail-table/team-detail-table.component';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { BordereauComponent } from './components/bordereau/bordereau.component';
import { BordereauTableComponent } from './components/bordereau/bordereau-table/bordereau-table.component';

registerLocaleData(en);

@NgModule({
    declarations: [
        AppComponent,
        ProjectComponent,
        TypeDialogComponent,
        ResourceDialogComponent,
        EquipementComponent,
        EquipementTableComponent,
        EquipementDetailComponent,
        EquipementDetailTableComponent,
        WorkforceComponent,
        WorkforceTableComponent,
        MaterialComponent,
        VracComponent,
        DiversComponent,
        ContractorComponent,
        MaterialTableComponent,
        VracTableComponent,
        DiversTableComponent,
        ContractorTableComponent,
        TeamComponent,
        AddTeamComponent,
        TransferTableComponent,
        TeamTableComponent,
        TeamDetailComponent,
        TeamDetailTableComponent,
        BordereauComponent,
        ResourceComponent,
        BordereauTableComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        NzLayoutModule,
        NzMenuModule,
        NzIconModule,
        IconsProviderModule,
        NzTabsModule,
        NzModalModule,
        NzButtonModule,
        NzInputModule,
        NzFormModule,
        NzSelectModule,
        NzDividerModule,
        NzListModule,
        NzMessageModule,
        NzGridModule,
        NzDescriptionsModule,
        NzSpaceModule,
    ],
    providers: [{ provide: NZ_I18N, useValue: en_US }],
    bootstrap: [AppComponent],
})
export class AppModule {}
