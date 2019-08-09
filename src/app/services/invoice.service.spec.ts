import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Observable, Observer } from 'rxjs';

import { InvoiceService } from './invoice.service';

describe('InvoiceService', () => {	  

  function setup() {

    const invoiceService = TestBed.get(InvoiceService);    
    
    return { invoiceService};

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
  
});