import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl , Validators} from '@angular/forms';

import { IPosition, IInvoice } from '../data/interfaces';
import { InvoiceService } from '../core/invoice.service';

@Component({
  selector: 'app-invoice-form',
  templateUrl: '../templates/invoice-form.component.html',
  styleUrls: ['../stylesheets/invoice-form.component.css']
})

export class InvoiceFormComponent implements OnInit {
  	
  //Taxes options
  private taxes: number[] = [0, 0.105, 0.21, 0.27];

  //Invoices collection stored
  private invoices: IInvoice[];

  //Invoice id selected
  private selectedId: number;

  //The invoice form
  private formInvoice: FormGroup;

  //Control the submit state
  private formSubmitted: boolean;

  //Forecast data
  private forecast:any;

  constructor(private formBuilder: FormBuilder, 
  	private invoiceService: InvoiceService){ }

  ngOnInit(){      
  	this.invoices = this.invoiceService.getInvoices();  		
  	this.buildForm();

  	//if the navigator geolocation is available, get the current user position
  	if (navigator.geolocation) {
 		  this.getUserCurrentPosition();
 	  }
  }

  //Build invoice form
  private buildForm(): void{		
	  this.formSubmitted = false;		
		  
    //Set the form fields and validators
	  this.formInvoice = this.formBuilder.group({
	  	id: [{value:0,updateOn: 'blur'}, [Validators.required, Validators.pattern('[0-9]{1,}'), Validators.min(1)] ],
	   	net: [{value:0}, [Validators.required, Validators.min(1)]],
	   	tax: [null],
	   	total: [{value: 0, disabled: true}]
	  });

	  //set the form data
	  const dataForm = this.invoiceService.getDataForm();
	  this.formInvoice.patchValue(dataForm);
    this.updateTotal();

    //Update the total value when net or tax control changes
    this.net.valueChanges.subscribe(value => {
      this.updateTotal();      
    });
    
    this.tax.valueChanges.subscribe(value => {
      this.updateTotal();      
    });

    //Store the form current value in localStorage
    this.formInvoice.valueChanges.subscribe(value => {
      if(this.formInvoice.valid === true){        
        this.invoiceService.storeInvoice(this.formInvoice.value);        
      }      
    });    

	  //Set custom async validator for check the invoice number
	  /*this.id.setAsyncValidators());*/
	}

  private updateTotal(){
    if(this.net.valid === true && this.tax.valid === true){
      const total = this.net.value * (1 + parseFloat(this.tax.value));
      this.total.patchValue(total)
    }
  }

	private onSubmit(): void{
  	this.formSubmitted = true;
  	if(this.formInvoice.valid === true){
  	  //All form data is valid, add the invoice
      this.invoices = this.invoiceService.add(this.formInvoice.value);
      this.clear();
  	}  		  	
  }  	
  	
	private clear(){
		const dataForm = this.invoiceService.getDefaultValues();	  
    this.formSubmitted = false;
    this.formInvoice.reset(dataForm);    
    this.invoiceService.deleteInvoiceStorage();
	}

  //Get user current position
  private getUserCurrentPosition(): void{
		const getCoords = (position) =>{			
			const userPosition: IPosition = {lat: position.coords.latitude, lng: position.coords.longitude};
			//Get the weather conditions for the next days
			this.getWeatherData(userPosition);
		}

		navigator.geolocation.getCurrentPosition(getCoords, null, { timeout: 5000 });
  }

  private selectForDelete(invoiceNumber: number){
    this.selectedId = invoiceNumber;
    this.invoiceService.toggleModal(true);
  }

	private remove(invoiceNumber: number):void{    
  	this.invoices = this.invoiceService.remove(invoiceNumber);    
    this.invoiceService.toggleModal(false);
  }	

	private getWeatherData(position: IPosition):void{
		this.invoiceService.getLocationKey(position).subscribe((response)=>{			
		  	if(response && response.Key){		  		
		  		this.invoiceService.getCurrentConditions(response.Key).subscribe((response)=>{   
		  			this.forecast = response;		
		  		});
		  	}		  		
		});
	}	

  //getters for accessing to form fields
	get id(): FormControl {
    return this.formInvoice.get('id') as FormControl;
  }

  get net(): FormControl {
   	return this.formInvoice.get('net') as FormControl;
  }  	

  get tax(): FormControl {
   	return this.formInvoice.get('tax') as FormControl;
  }

  get total(): FormControl {
   	return this.formInvoice.get('total') as FormControl;
  }

}