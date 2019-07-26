import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule  } from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';

import { AppComponent } from './core/app.component';
import { AppRoutingModule } from './app-routing.module';

import { InvoiceResumeComponent } from './core/invoice-resume.component';
import { InvoiceFormComponent } from './core/invoice-form.component';

@NgModule({
  declarations: [
    AppComponent,
    InvoiceResumeComponent,
    InvoiceFormComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }