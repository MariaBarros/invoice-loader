import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";

import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

describe('AppComponent', () => {  
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ 
        RouterTestingModule ,
        ReactiveFormsModule
      ],
      declarations: [ 
        AppComponent        
      ]
    }).compileComponents();
  }));

  function setup() {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;     

    return { fixture, component };
  }

  it('should create the app', () => {    
    const { component } = setup();
    expect(component).toBeTruthy();
  });

});
