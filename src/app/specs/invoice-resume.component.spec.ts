import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { InvoiceResumeComponent } from '../core/invoice-resume.component';
import { InvoiceService } from '../core/invoice.service';
import { CustomDecimalPipe } from '../core/custom-decimal.pipe';
import { CustomNumberPipe } from '../core/custom-number.pipe';

describe('InvoiceResumeComponent', () => {
  let component: InvoiceResumeComponent;
  let fixture: ComponentFixture<InvoiceResumeComponent>;

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

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
