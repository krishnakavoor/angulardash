import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardProfileComponent } from './dashboardProfile/dashboardprofile.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [{
  path: 'home', component: DashboardComponent
},
{
path: 'page/:id', component: DashboardProfileComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
