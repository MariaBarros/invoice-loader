import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceFormComponent } from '../core/invoice-form.component';

import { ReactiveFormsModule } from '@angular/forms';

describe('InvoiceFormComponent', () => {
  let component: InvoiceFormComponent;
  let fixture: ComponentFixture<InvoiceFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceFormComponent ],
       imports:[
        ReactiveFormsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app and show the form', () => {        
    expect(component).toBeTruthy();
  });

  it(`should have taxes options`, () => {
    const taxesValues = [0, 10.5, 21, 27];    
    console.log(component.taxes);
    const validTaxes = component.taxes && component.taxes === taxesValues;
    expect(validTaxes).toBe(true);
  });

  it('should render the invoices list in #invoices-list', () => {    
    const compiled = fixture.debugElement.nativeElement;
    const invoicesList = compiled.querySelector('#invoices-list');    
    expect(invoicesList).not.toBe(undefined);
  });

});
