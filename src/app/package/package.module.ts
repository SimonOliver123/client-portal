import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PackageRoutingModule } from './package-routing.module';
import { SoftwareService } from '../services/software.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PackageRoutingModule
  ],
  providers: [SoftwareService]
})
export class PackageModule { }
