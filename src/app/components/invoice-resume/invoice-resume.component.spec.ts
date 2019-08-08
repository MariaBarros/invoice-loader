import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { InvoiceResumeComponent } from './invoice-resume.component';
import { DialogDeleteComponent } from '../dialog-delete/dialog-delete.component';

import { InvoiceService } from '../../services/invoice.service';
import { CustomDecimalPipe } from '../../pipes/custom-decimal.pipe';
import { CustomNumberPipe } from '../../pipes/custom-number.pipe';

describe('InvoiceResumeComponent', () => {  

  function setup() {  
    const invoiceService = TestBed.get(InvoiceService);
    const fixture = TestBed.createComponent(InvoiceResumeComponent);
    const component = fixture.componentInstance;  

    return { component, invoiceService};
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        InvoiceResumeComponent,
        DialogDeleteComponent,
        CustomDecimalPipe,
        CustomNumberPipe 
      ],
      providers: [InvoiceService],
      imports:[       
        HttpClientTestingModule
      ]
    })
    .compileComponents();
  }));

  
  it('should create', () => {
    const { component } = setup();
    expect(component).toBeTruthy();
  });

  it('should delete all work', ()=>{
    const { invoiceService } = setup();
    invoiceService.deleteAll();

    invoiceService.getInvoices().subscribe((invoices) =>{
      expect(invoices.length === 0).toBe(true);  
    });
    
  })
});
