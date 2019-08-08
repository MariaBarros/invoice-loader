import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { HttpClientTestingModule } from '@angular/common/http/testing';

import { InvoiceListComponent } from './invoice-list.component';
import { InvoiceFormComponent } from '../invoice-form/invoice-form.component';
import { WeatherComponent } from '../weather/weather.component';
import { DialogDeleteComponent } from '../dialog-delete/dialog-delete.component';

import { CustomDecimalPipe } from '../../pipes/custom-decimal.pipe';
import { CustomNumberPipe } from '../../pipes/custom-number.pipe';

import { InvoiceService } from '../../services/invoice.service';

describe('InvoiceListComponent', () => {  

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[
        ReactiveFormsModule,
        HttpClientTestingModule
      ],
      declarations: [ 
        InvoiceListComponent,
        InvoiceFormComponent,
        CustomDecimalPipe,
        CustomNumberPipe,
        WeatherComponent,
        DialogDeleteComponent
     ]
    })
    .compileComponents();
  }));

  function setup() {
    const fixture = TestBed.createComponent(InvoiceListComponent);
    const component = fixture.componentInstance;
    const invoiceService = fixture.debugElement.injector.get(InvoiceService);    

    return { fixture, component, invoiceService };
  }

  it('should create', () => {
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
      invoiceService.getInvoices().subscribe((invoices) => {
        const invoiceDeleted = invoices.filter((invoice) => invoice.id === 100);  
        expect(invoiceDeleted.length === 0).toBe(true);
      });
            
  }); 
  
});
