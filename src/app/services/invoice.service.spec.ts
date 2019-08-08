import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Observable, Observer } from 'rxjs';

import { InvoiceService } from './invoice.service';

describe('InvoiceService', () => {	  

  function setup() {  
    const invoiceService = TestBed.get(InvoiceService);    
    const itemStorage = {id:100, net: 2000, tax: 0.21, total: 1210};

    return { invoiceService,  itemStorage};
  }  

  beforeEach(() => TestBed.configureTestingModule({
  	imports:[       
        HttpClientTestingModule
      ]
  }));

  it('should be created', () => {
    const {invoiceService} = setup();
    expect(invoiceService).toBeTruthy();
  });

  it('should get Weather API Info', () => {
    const { invoiceService } = setup();    

    invoiceService.getLocationKey({lat:-25, lng:-64}).subscribe(data => {
      expect(data.Key).not.toBe(undefined);
      invoiceService.getCurrentConditions(data.Key).subscribe((forecast)=>{   
        expect(forecast).not.toBe(undefined)
      });
    });
    
  });

  it('should storage the invoice in localStorage',()=>{
  	const { invoiceService, itemStorage } = setup();
  	invoiceService.storeInvoice(itemStorage);
  	const itemStored = localStorage.getItem('invoice');
  	expect(itemStored).not.toBe(null);
  });

  it('should get the invoice stored for patch values in the form',()=>{
  	const { invoiceService, itemStorage } = setup();
  	const itemStored = invoiceService.getDataForm();
	const equalValues = itemStored.id === itemStorage.id && 
		itemStored.net === itemStorage.net &&
		itemStored.tax === itemStorage.tax;

  	expect(equalValues).toBe(true);
  });


  it('should delete the invoice stored in localStorage',()=>{
  	const { invoiceService } = setup();
  	invoiceService.deleteInvoiceStorage();
  	const itemStorage = localStorage.getItem('invoice');
  	expect(itemStorage).toBe(null);
  });
});
