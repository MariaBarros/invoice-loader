import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { InvoiceResumeComponent } from '../core/invoice-resume.component';
import { InvoiceService } from '../core/invoice.service';
import { CustomDecimalPipe } from '../core/custom-decimal.pipe';
import { CustomNumberPipe } from '../core/custom-number.pipe';

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
    const updateInvoices = invoiceService.getInvoices();
    expect(updateInvoices.length === 0).toBe(true);
  })
});
