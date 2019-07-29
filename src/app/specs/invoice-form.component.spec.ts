import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { InvoiceFormComponent } from '../core/invoice-form.component';
import { InvoiceService } from '../core/invoice.service';
import { CustomDecimalPipe } from '../core/custom-decimal.pipe';
import { CustomNumberPipe } from '../core/custom-number.pipe';


describe('InvoiceFormComponent', () => {
  let component: InvoiceFormComponent;
  let fixture: ComponentFixture<InvoiceFormComponent>;

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

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should show the form', () => {        
    expect(component).toBeTruthy();
  });

  /*it(`should have taxes options`, () => {
    const taxesValues = [0, 0.105, 0.21, 0.27];
    const validTaxes = component.taxes && component.taxes === taxesValues;
    expect(validTaxes).toBe(true);
  });

  it('should render the invoices list in #invoices-list', () => {    
    const compiled = fixture.debugElement.nativeElement;
    const invoicesList = compiled.querySelector('#invoices-list');    
    expect(invoicesList).not.toBe(undefined);
  });*/

});
