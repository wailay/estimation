import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BordereauResourceComponent } from './components/bordereau-resource/bordereau-resource.component';
import { BordereauComponent } from './components/bordereau/bordereau.component';
import { LookupComponent } from './components/lookup/lookup.component';
import { ProjectComponent } from './components/project/project.component';
import { ResourceComponent } from './components/resource/resource.component';
import { AddTeamComponent } from './components/team/add-team/add-team.component';
import { TeamComponent } from './components/team/team.component';

const routes: Routes = [
    { path: '', redirectTo: '/project', pathMatch: 'full' },
    { path: 'project', component: ProjectComponent },
    { path: 'resource', component: ResourceComponent },
    { path: 'team', component: TeamComponent },
    { path: 'team-add', component: AddTeamComponent },
    { path: 'bordereau', component: BordereauComponent },
    { path: 'bordereau-ressource', component: BordereauResourceComponent },
    { path: 'affectation', component: LookupComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
