import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule  } from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { InvoiceResumeComponent } from './components/invoice-resume/invoice-resume.component';
import { InvoiceFormComponent } from './components/invoice-form/invoice-form.component';

import { WeatherComponent } from './components/weather/weather.component';
import { DialogDeleteComponent } from './components/dialog-delete/dialog-delete.component';

import { CustomDecimalPipe } from './pipes/custom-decimal.pipe';
import { CustomNumberPipe } from './pipes/custom-number.pipe';
import { InvoiceListComponent } from './components/invoice-list/invoice-list.component';


@NgModule({
  declarations: [
    AppComponent,
    InvoiceResumeComponent,
    InvoiceFormComponent,
    CustomDecimalPipe,
    CustomNumberPipe,
    WeatherComponent,
    DialogDeleteComponent,
    InvoiceListComponent
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