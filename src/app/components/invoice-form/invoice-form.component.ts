import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl , Validators} from '@angular/forms';

import { IPosition, IInvoice } from '../../data/interfaces';
import { Invoice } from '../../invoice';
import { InvoiceService } from '../../services/invoice.service';

@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.css']
})

export class InvoiceFormComponent implements OnInit {
  //Event emit when add a new invoice
  @Output() onAdd: EventEmitter<any> = new EventEmitter<any>();

  //Taxes options
  private taxes: number[] = [0, 0.105, 0.21, 0.27];  

  //The invoice form
  private formInvoice: FormGroup;

  private invoiceData: Invoice;

  //Control the submit state
  private formSubmitted: boolean;  

  constructor(private formBuilder: FormBuilder, 
  	private invoiceService: InvoiceService){ }

  ngOnInit(){  	

    this.invoiceData = new Invoice();

    //Set the form fields and validators
    this.formInvoice = this.formBuilder.group({

      id: [ { value:0, updateOn: 'blur' }, [
            Validators.required, 
            Validators.pattern('[0-9]{1,}'), 
            Validators.min(1)
          ], [ this.invoiceService.validateNumber() ] 
      ],

      net: [ { value:0 }, [
            Validators.required, 
            Validators.min(1)
          ]
      ],

      tax: [null],

      total: [{ value: 0, disabled: true }]

    });

  	this.controlForm();  	

  }

  //Build invoice form
  private controlForm(): void{		

	  this.formSubmitted = false;		
		  
	  //set the form data	  
	  this.formInvoice.patchValue(this.invoiceData);    

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

        this.invoiceData.store();       

      }      

    });    
	  
	}

  //Show total
  private updateTotal(){

    if(this.net.valid === true && this.tax.valid === true){     

      this.invoiceData.updateValues(this.id.value, this.net.value, this.tax.value);
      
      this.total.patchValue(this.invoiceData.total);

    }

  }

	private onSubmit(): void{

  	this.formSubmitted = true;

  	if(this.formInvoice.valid === true){

  	  //All form data is valid, add the invoice
      this.invoiceService.add(this.formInvoice.value);

      this.invoiceData.removeFromStorage();

      //Emit event to the parent component an clear the form
      this.onAdd.emit({refresh: true});

      this.clear();
  	}  		  	

  }  	
  
  //Clear the form
	private clear(){
		
    this.invoiceData.removeFromStorage();

    this.formSubmitted = false;    

    //Reset the form and clear the item stored in the local storage
    this.formInvoice.reset(this.invoiceData);
    
    this.invoiceData.removeFromStorage();

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