import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import en from '@angular/common/locales/en';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { en_US, NZ_I18N } from 'ng-zorro-antd/i18n';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BordereauResourceTableComponent } from './components/bordereau-resource/bordereau-resource-table/bordereau-resource-table.component';
import { BordereauResourceComponent } from './components/bordereau-resource/bordereau-resource.component';
import { BordereauDialogComponent } from './components/bordereau/bordereau-dialog/bordereau-dialog.component';
import { BordereauTableComponent } from './components/bordereau/bordereau-table/bordereau-table.component';
import { BordereauComponent } from './components/bordereau/bordereau.component';
import { FgBordereauTableComponent } from './components/bordereau/fg-bordereau/fg-bordereau-table/fg-bordereau-table.component';
import { FgBordereauComponent } from './components/bordereau/fg-bordereau/fg-bordereau.component';
import { LookupComponent } from './components/lookup/lookup.component';
import { ProjectComponent } from './components/project/project.component';
import { ContractorTableComponent } from './components/resource/contractor/contractor-table/contractor-table.component';
import { ContractorComponent } from './components/resource/contractor/contractor.component';
import { FgDialogComponent } from './components/resource/dialogs/fg-dialog/fg-dialog.component';
import { ResourceDialogComponent } from './components/resource/dialogs/resource-dialog/resource-dialog.component';
import { TypeDialogComponent } from './components/resource/dialogs/type-dialog/type-dialog.component';
import { DiversTableComponent } from './components/resource/divers/divers-table/divers-table.component';
import { DiversComponent } from './components/resource/divers/divers.component';
import { EquipementDetailTableComponent } from './components/resource/equipement/equipement-detail/detail-table/equipement-detail-table.component';
import { EquipementDetailComponent } from './components/resource/equipement/equipement-detail/equipement-detail.component';
import { EquipementTableComponent } from './components/resource/equipement/equipement-table/equipement-table.component';
import { EquipementComponent } from './components/resource/equipement/equipement.component';
import { FgTableComponent } from './components/resource/fg/fg-table/fg-table.component';
import { FgComponent } from './components/resource/fg/fg.component';
import { MaterialTableComponent } from './components/resource/material/material-table/material-table.component';
import { MaterialComponent } from './components/resource/material/material.component';
import { ResourceTableComponent } from './components/resource/resource-table/resource-table.component';
import { ResourceComponent } from './components/resource/resource.component';
import { VracTableComponent } from './components/resource/vrac/vrac-table/vrac-table.component';
import { VracComponent } from './components/resource/vrac/vrac.component';
import { WorkforceTableComponent } from './components/resource/workforce/workforce-table/workforce-table.component';
import { WorkforceComponent } from './components/resource/workforce/workforce.component';
import { AddTeamComponent } from './components/team/add-team/add-team.component';
import { TransferTableComponent } from './components/team/add-team/transfer-table/transfer-table.component';
import { TeamDetailTableComponent } from './components/team/team-detail/team-detail-table/team-detail-table.component';
import { TeamDetailComponent } from './components/team/team-detail/team-detail.component';
import { TeamTableComponent } from './components/team/team-table/team-table.component';
import { TeamComponent } from './components/team/team.component';
import { IconsProviderModule } from './icons-provider.module';

registerLocaleData(en);

@NgModule({
    declarations: [AppComponent],
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
        NzGridModule,
        NzDescriptionsModule,
        NzSpaceModule,
        NzTypographyModule,
        NzCardModule,
        NzCheckboxModule,
        NzDatePickerModule,
        NzRadioModule,
        NzPopconfirmModule,
        NzTableModule,
        NzUploadModule,
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
        BordereauDialogComponent,
        BordereauResourceComponent,
        BordereauResourceTableComponent,
        LookupComponent,
        ResourceTableComponent,
        FgComponent,
        FgTableComponent,
        FgDialogComponent,
        FgBordereauTableComponent,
        FgBordereauComponent,
    ],
    providers: [{ provide: NZ_I18N, useValue: en_US }],
    bootstrap: [AppComponent],
})
export class AppModule {}
