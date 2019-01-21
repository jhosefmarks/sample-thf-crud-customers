import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'home', loadChildren: './home/home.module#HomeModule' },
  { path: 'customers', loadChildren: './customers/customers.module#CustomersModule' },
  { path: '', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
