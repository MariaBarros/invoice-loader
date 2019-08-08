import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Observable, Observer } from 'rxjs';

import { InvoiceFormComponent } from './invoice-form.component';
import { InvoiceService } from '../../services/invoice.service';


describe('InvoiceFormComponent', () => {  

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [         
        InvoiceFormComponent        
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

  

});