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
  private showModal:boolean = false;

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
  			totalTaxes += invoice.net * (invoice.tax);
  			totalGlobal += invoice.net + (invoice.net * (invoice.tax));
  		});

  		this.totalNet = totalNet;
  		this.totalTaxes = totalTaxes;
  		this.totalGlobal = totalGlobal;
  	}

  	deleteAll(){
  		this.invoiceService.deleteAll();
      this.showModal = false;
  		this.getInvoices();
  	}

}