import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";

import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from '../core/app.component';
import { InvoiceFormComponent } from '../core/invoice-form.component';

import { CustomDecimalPipe } from '../core/custom-decimal.pipe';
import { CustomNumberPipe } from '../core/custom-number.pipe';

describe('AppComponent', () => {  
  let component: InvoiceFormComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ 
        RouterTestingModule ,
        ReactiveFormsModule
      ],
      declarations: [ 
        AppComponent,
        CustomDecimalPipe,
        CustomNumberPipe,
        InvoiceFormComponent 
      ]
    }).compileComponents();
  }));

   beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);    
    component = fixture.componentInstance;    
    fixture.detectChanges();
  });

  it('should create the app', () => {    
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

});
