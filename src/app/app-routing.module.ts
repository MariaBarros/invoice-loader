import { NgModule } from '@angular/core';
//import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';


//Components for paths
import { InvoiceListComponent }   from './components/invoice-list/invoice-list.component';
//import { InvoiceFormComponent }   from './components/invoice-form/invoice-form.component';
import { InvoiceResumeComponent }   from './components/invoice-resume/invoice-resume.component';

//Application Routes 
const routes: Routes = [
  { 
  	path: '', 
  	redirectTo: '/loader', 
  	pathMatch: 'full' },
  { 
  	path: 'loader', 
  	component: InvoiceListComponent  	
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