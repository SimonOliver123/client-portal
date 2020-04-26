import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientModule } from './client/client.module';
import { HttpClientModule } from '@angular/common/http';
import { PackageOverviewComponent } from './package/package-overview/package-overview.component';
import { PackageModule } from './package/package.module';

@NgModule({
  declarations: [
    AppComponent,
    PackageOverviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,

    ClientModule,
    PackageModule
  ],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }
