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
import { DetailTableComponent } from './components/resource/resource-detail/detail-table/detail-table.component';
import { ResourceDetailComponent } from './components/resource/resource-detail/resource-detail.component';
import { ResourceTableComponent } from './components/resource/resource-table/resource-table.component';
import { ResourceComponent } from './components/resource/resource.component';
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

registerLocaleData(en);

@NgModule({
    declarations: [
        AppComponent,
        ProjectComponent,
        ResourceComponent,
        ResourceTableComponent,
        ResourceDetailComponent,
        TypeDialogComponent,
        ResourceDialogComponent,
        DetailTableComponent,
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
    ],
    providers: [{ provide: NZ_I18N, useValue: en_US }],
    bootstrap: [AppComponent],
})
export class AppModule {}
