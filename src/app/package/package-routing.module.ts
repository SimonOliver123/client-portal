import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PackageOverviewComponent } from './package-overview/package-overview.component';

const routes: Routes = [
  { path: 'packages', component: PackageOverviewComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PackageRoutingModule { }
