import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from './../shared/shared.module';

import { CustomersRoutingModule } from './customers-routing.module';
import { CustomerListComponent } from './customer-list/customer-list.component';

@NgModule({
  declarations: [CustomerListComponent],
  imports: [
    CommonModule,

    SharedModule,

    CustomersRoutingModule
  ]
})
export class CustomersModule { }
