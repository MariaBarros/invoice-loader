import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from '../core/app.component';

describe('AppComponent', () => {  
  let component: InvoiceFormComponent;
  let fixture: ComponentFixture<InvoiceFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppComponent ]
    }).compileComponents();
  }));

   beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);    
    component = fixture.componentInstance;
    //app = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app and show the form', () => {    
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

});
