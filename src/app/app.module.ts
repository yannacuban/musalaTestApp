import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

import { AppService } from './services/appService';
import {ErrorService} from './services/error-service.service';
import {NgSelectModule} from '@ng-select/ng-select';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {
  NgbCollapseModule, NgbModalModule,
  NgbPaginationModule, NgbModule
} from '@ng-bootstrap/ng-bootstrap';

import { NgxMaskModule, IConfig } from 'ngx-mask'

import { AppComponent } from './app.component';
import { GatewayListComponent } from './gateway-list/gateway-list.component';
import { GatewayDetailComponent } from './gateway-detail/gateway-detail.component';
import { GatewayFormComponent } from './gateway-form/gateway-form.component';


@NgModule({
  declarations: [
    AppComponent,
    GatewayListComponent,
    GatewayDetailComponent,
    GatewayFormComponent    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgSelectModule,
    FormsModule,
    NgbCollapseModule,
    NgxMaskModule.forRoot(),
    NgbModalModule,
    NgbPaginationModule,
    ToastrModule.forRoot(
      {
        timeOut: 3000,
        preventDuplicates: true,
        closeButton: true
      }),
    NgbModule    
  ],
  providers: [
    AppService,   
    ErrorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
