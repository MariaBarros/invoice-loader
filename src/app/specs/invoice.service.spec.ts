import { TestBed } from '@angular/core/testing';

import { InvoiceService } from '../core/invoice.service';

describe('InvoiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InvoiceService = TestBed.get(InvoiceService);
    expect(service).toBeTruthy();
  });
});
