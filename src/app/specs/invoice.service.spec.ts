import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { InvoiceService } from '../core/invoice.service';

describe('InvoiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({
  	imports:[       
        HttpClientTestingModule
      ]
  }));

  it('should be created', () => {
    const service: InvoiceService = TestBed.get(InvoiceService);
    expect(service).toBeTruthy();
  });
});
