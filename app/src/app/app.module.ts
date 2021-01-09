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
import { DeleteDialogComponent } from './components/resource/dialogs/delete-dialog/delete-dialog.component';
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
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';

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
        DeleteDialogComponent,
        DetailTableComponent,
        EquipementComponent,
        EquipementTableComponent,
        EquipementDetailComponent,
        EquipementDetailTableComponent,
    ],
    imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule, FormsModule, HttpClientModule, BrowserAnimationsModule],
    providers: [{ provide: NZ_I18N, useValue: en_US }],
    bootstrap: [AppComponent],
})
export class AppModule {}
