import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl , Validators} from '@angular/forms';

import { IPosition, IInvoice } from '../../data/interfaces';
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

  //Control the submit state
  private formSubmitted: boolean;  

  constructor(private formBuilder: FormBuilder, 
  	private invoiceService: InvoiceService){ }

  ngOnInit(){  	

    //Set the form fields and validators
    this.formInvoice = this.formBuilder.group({
      id: [
        {value:0,updateOn: 'blur'}, 
        [
          Validators.required, 
          Validators.pattern('[0-9]{1,}'), 
          Validators.min(1)
        ] 
      ],
      net: [
        {value:0}, 
        [
          Validators.required, 
          Validators.min(1)
        ]
      ],
      tax: [null],
      total: [{value: 0, disabled: true}]
    });

  	this.controlForm();  	
  }

  //Build invoice form
  private controlForm(): void{		
	  this.formSubmitted = false;		
		  
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
	  this.id.setAsyncValidators(this.invoiceService.validateNumber());
	}

  //Show total
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
      this.invoiceService.add(this.formInvoice.value);

      //Emit event to the parent component an clear the form
      this.onAdd.emit({refresh: true});
      this.clear();
  	}  		  	
  }  	
  
  //Clear the form
	private clear(){
		const dataForm = this.invoiceService.getDefaultValues();	  
    this.formSubmitted = false;    
    //Reset the form and clear the item stored in the local storage
    this.formInvoice.reset(dataForm);
    this.invoiceService.deleteInvoiceStorage();
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