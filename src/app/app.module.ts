import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxsModule } from '@ngxs/store';
import { environment } from 'src/environments/environment';
import { MaterialModule } from './material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/layout/navbar/navbar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProductState } from './store/products/products.state';
import { AlertsState } from './store/alert/alert.state';

@NgModule({
  declarations: [AppComponent, NavbarComponent, DashboardComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    NgxsModule.forRoot([ProductState, AlertsState], {
      developmentMode: !environment.production,
    }),
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
