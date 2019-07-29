import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule  } from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';

import { AppComponent } from './core/app.component';
import { AppRoutingModule } from './app-routing.module';

import { InvoiceResumeComponent } from './core/invoice-resume.component';
import { InvoiceFormComponent } from './core/invoice-form.component';
import { CustomDecimalPipe } from './core/custom-decimal.pipe';
import { CustomNumberPipe } from './core/custom-number.pipe';

@NgModule({
  declarations: [
    AppComponent,
    InvoiceResumeComponent,
    InvoiceFormComponent,
    CustomDecimalPipe,
    CustomNumberPipe
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