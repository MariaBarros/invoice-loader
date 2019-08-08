import { Component, ViewChild, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { DialogDeleteComponent } from '../../components/dialog-delete/dialog-delete.component';

import { InvoiceService } from '../../services/invoice.service';
import { IInvoice } from '../../data/interfaces';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css']
})

export class InvoiceListComponent implements OnInit {
  //Dialog for delete
  @ViewChild(DialogDeleteComponent) dialogDelete: DialogDeleteComponent;

  //Invoice id selected  
  private selectedId: number;

  //Invoices collection stored
  private invoices$:Observable<IInvoice[]>;

  constructor(private invoiceService: InvoiceService) { }

  ngOnInit() {
  	this.getInvoices();
  }

  getInvoices(): void{
  	this.invoices$ = this.invoiceService.getInvoices();
  }

  private selectForDelete(invoiceNumber: number): void{
    this.selectedId = invoiceNumber;
    this.dialogDelete.showDialog();
  }

  private remove(): void{  	
  	this.invoices$ = this.invoiceService.remove(this.selectedId);	  	
  }

}