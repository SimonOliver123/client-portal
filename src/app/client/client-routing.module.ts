import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientOverviewComponent } from './client-overview/client-overview.component';

const routes: Routes = [
  { path: 'clients', component: ClientOverviewComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
