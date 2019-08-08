import { Component, OnInit, ViewChild } from '@angular/core';

import { DialogDeleteComponent } from '../../components/dialog-delete/dialog-delete.component';

import { IPosition, IInvoice } from '../../data/interfaces';
import { InvoiceService } from '../../services/invoice.service';

@Component({
  selector: 'app-invoice-resume',
  templateUrl: './invoice-resume.component.html',
  styleUrls: ['../../app.component.css']
})

export class InvoiceResumeComponent implements OnInit {

	private invoices: IInvoice[];
	private totalNet: number;
	private totalTaxes: number;
	private totalGlobal: number;

  //Dialog for delete
  @ViewChild(DialogDeleteComponent) dialogDelete: DialogDeleteComponent;

  constructor(private invoiceService: InvoiceService) { }

  	ngOnInit() {  		
  		this.getInvoices();      
  	}

  	getInvoices(){
  		this.invoiceService.getInvoices().subscribe((invoices)=>{
        this.invoices = invoices;
      });
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

    deleteWork(){
      this.dialogDelete.showDialog();
    }

  	deleteAll(){
  		this.invoiceService.deleteAll();      
  		this.getInvoices();
  	}

}