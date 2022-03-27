import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
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
import { HttpClientModule } from '@angular/common/http';

import { NeoToolbarModule } from '@neomorphism/ng-neomorphism/neo-toolbar';
import { NeoFormFieldModule } from '@neomorphism/ng-neomorphism/neo-form-field'
import { FooterComponent } from './components/layout/footer/footer.component';
import { ProductListComponent } from './components/product-list/product-list/product-list.component';
import { ProductComponent } from './components/product/product.component';



@NgModule({
  declarations: [AppComponent, NavbarComponent, DashboardComponent, FooterComponent, ProductListComponent, ProductComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    NgxsModule.forRoot([ProductState, AlertsState], {
      developmentMode: !environment.production,
    }),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    BrowserAnimationsModule,
    HttpClientModule, NeoToolbarModule, NeoFormFieldModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
