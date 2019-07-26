import { NgModule } from '@angular/core';
//import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

//Components for paths
import { InvoiceFormComponent }   from './core/invoice-form.component';
import { InvoiceResumeComponent }   from './core/invoice-resume.component';

//Application Routes 
const routes: Routes = [
  { 
  	path: '', 
  	redirectTo: '/loader', 
  	pathMatch: 'full' },
  { 
  	path: 'loader', 
  	component: InvoiceFormComponent  	
  },
  { 
  	path: 'resume', 
  	component: InvoiceResumeComponent 
  } ,
  { path: '**', redirectTo: '/loader' }
];

@NgModule({  
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }