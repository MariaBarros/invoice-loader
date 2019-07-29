import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { InvoiceFormComponent } from '../core/invoice-form.component';
import { InvoiceService } from '../core/invoice.service';
import { CustomDecimalPipe } from '../core/custom-decimal.pipe';
import { CustomNumberPipe } from '../core/custom-number.pipe';


describe('InvoiceFormComponent', () => {  

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [         
        InvoiceFormComponent,
        CustomDecimalPipe,
        CustomNumberPipe
      ],
      providers: [InvoiceService],
      imports:[
        ReactiveFormsModule,
        HttpClientTestingModule
      ]
    })
    .compileComponents();
  }));

  function setup() {
    const fixture = TestBed.createComponent(InvoiceFormComponent);
    const component = fixture.componentInstance;
    const invoiceService = fixture.debugElement.injector.get(InvoiceService);    

    return { fixture, component, invoiceService };
  }  

  it('should create the invoice-form component', () => {        
    const { component } = setup();
    expect(component).toBeTruthy();
  });

  it('should get invoices', () => {
      const { fixture, invoiceService } = setup();                  
      const currentInvoices = invoiceService.getInvoices();            
      expect(currentInvoices).not.toBe(undefined);      
  });  

  it('should add invoice', () => {
      const { invoiceService } = setup();

      const currentInvoices = invoiceService.getInvoices();            
      
      const newInvoice = {id:100, net:1000, tax:0.21};
      const updatedInvoices = invoiceService.add(newInvoice);
      const invoiceAdded = updatedInvoices.filter((invoice) => invoice.id === 100); 
      
      expect(invoiceAdded.length>0).toBe(true);      
  });

  it('should remove invoice', () => {
      const { invoiceService } = setup();      
            
      invoiceService.remove(100);
      const updatedInvoices = invoiceService.getInvoices();
      const invoiceDeleted = updatedInvoices.filter((invoice) => invoice.id === 100);
      
      expect(invoiceDeleted.length === 0).toBe(true);
  }); 

});