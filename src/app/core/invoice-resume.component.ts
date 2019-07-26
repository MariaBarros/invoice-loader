import { Component, OnInit } from '@angular/core';

import { IPosition, IInvoice } from '../data/interfaces';
import { InvoiceService } from '../core/invoice.service';

@Component({
  selector: 'app-invoice-resume',
  templateUrl: '../templates/invoice-resume.component.html',
  styleUrls: ['../stylesheets/app.component.css']
})

export class InvoiceResumeComponent implements OnInit {

	private invoices: IInvoice[];
	private totalNet: number;
	private totalTaxes: number;
	private totalGlobal: number;

  	constructor(private invoiceService: InvoiceService) { }

  	ngOnInit() {  		
  		this.getInvoices();
  	}

  	getInvoices(){
  		this.invoices = this.invoiceService.getInvoices();
  		this.calculateTotals();
  	}

  	calculateTotals(){
  		let totalNet = 0;
  		let totalTaxes = 0;
  		let totalGlobal = 0;

  		this.invoices.map((invoice) =>{
  			totalNet += invoice.net;
  			totalTaxes += invoice.net * (invoice.tax/100);
  			totalGlobal += invoice.net + (invoice.net * (invoice.tax/100));
  		});

  		this.totalNet = totalNet;
  		this.totalTaxes = totalTaxes;
  		this.totalGlobal = totalGlobal;
  	}

  	deleteAll(){
  		this.invoiceService.deleteAll();
  		this.getInvoices();
  	}

}