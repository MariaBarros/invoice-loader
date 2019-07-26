import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceResumeComponent } from './invoice-resume.component';

describe('InvoiceResumeComponent', () => {
  let component: InvoiceResumeComponent;
  let fixture: ComponentFixture<InvoiceResumeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceResumeComponent ]
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
