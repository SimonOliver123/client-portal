import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { ClientOverviewComponent } from './client-overview/client-overview.component';
import { ClientService } from '../services/client.service';

@NgModule({
  declarations: [ClientOverviewComponent],
  imports: [
    CommonModule,
    ClientRoutingModule
  ],
  providers: [ClientService],
  entryComponents: [ClientOverviewComponent]
})
export class ClientModule { }
