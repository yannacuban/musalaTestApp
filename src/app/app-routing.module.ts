import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GatewayDetailComponent } from './gateway-detail/gateway-detail.component';
import { GatewayFormComponent } from './gateway-form/gateway-form.component';
import {GatewayListComponent} from './gateway-list/gateway-list.component'

const routes: Routes = [
  {path: '', redirectTo: '/gatewayList', pathMatch: 'full'},
  {path: 'gatewayList', component: GatewayListComponent},
  {path: 'gateway', component: GatewayFormComponent},  
  {path: 'edit/:id', component: GatewayFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
