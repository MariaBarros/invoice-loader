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
  	private taxes: number[] = [0, 10.5, 21, 27];
  	//Invoices collection stored
  	private invoices: IInvoice[];

  	//The invoice form
  	private formInvoice: FormGroup;
  	//Control the submit state
  	private formSubmitted: boolean;
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
	    	id: [{updateOn: 'blur'}, [Validators.required, Validators.pattern('[0-9]{1,}'), Validators.min(1)] ],
	    	net: [{updateOn: 'blur'}, [Validators.required, Validators.pattern('[0-9]{1,}'), Validators.min(1)]],
	    	tax: [null],
	    	total: [{disabled: true}]
	    });

	    //set the form data
	    const dataForm = this.invoiceService.getDataForm();
	    this.formInvoice.patchValue(dataForm);
	    //Set custom async validator for check the invoice number
	    /*this.id.setAsyncValidators());*/
	}

	private onSubmit(): void{
  		this.formSubmitted = true;
  		if(this.formInvoice.valid === false){
  			return;
  		}  		
  		//All form data is valid, add the invoice
  		this.invoices = this.invoiceService.add(this.formInvoice.value);  		
  	}  	
  	
	private clear(){
		const dataForm = this.invoiceService.getDefaultValues();
	    this.formInvoice.patchValue(dataForm);
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

	private remove(invoiceNumber: number):void{
  		this.invoices = this.invoiceService.remove(invoiceNumber);
  	}	

	private process():void{
		this.invoiceService.saveInvoices();
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