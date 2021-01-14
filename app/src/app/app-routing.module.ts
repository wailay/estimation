import { BordereauResourceComponent } from './components/bordereau-resource/bordereau-resource.component';
import { TeamLookupComponent } from './components/lookup/team-lookup/team-lookup.component';
import { BordereauComponent } from './components/bordereau/bordereau.component';
import { AddTeamComponent } from './components/team/add-team/add-team.component';
import { TeamComponent } from './components/team/team.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectComponent } from './components/project/project.component';
import { ResourceComponent } from './components/resource/resource.component';

const routes: Routes = [
    { path: 'project', component: ProjectComponent },
    { path: 'resource', component: ResourceComponent },
    { path: 'team', component: TeamComponent },
    { path: 'team-add', component: AddTeamComponent },
    { path: 'bordereau', component: BordereauComponent },
    { path: 'bordereau-ressource', component: BordereauResourceComponent },
    { path: 'affectation', component: TeamLookupComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
