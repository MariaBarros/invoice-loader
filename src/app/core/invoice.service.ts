import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { IInvoice, IPosition } from '../data/interfaces';

//Json data
import invoicesJson from '../data/invoices.json';

const API_WEATHER_KEY:string = "iGNOrNeci7aiePQjzfCJAOD81wnvqVKN";
const API_WEATHER_URL:string = "http://dataservice.accuweather.com/";

const COLLECTION_STORED_NAME : string = "invoices";
const ITEM_STORED_NAME : string = "invoice";
const MODAL_DELETE = '#modalDelete';

declare var $:any;

@Injectable({
  providedIn: 'root'
})

export class InvoiceService {

  private invoices: IInvoice[];

  constructor(private http: HttpClient) {
  	this.invoices = invoicesJson;
  }

  getInvoices(): IInvoice[]{
  	const invoices:IInvoice[] = JSON.parse(localStorage.getItem(COLLECTION_STORED_NAME));  	
  	if(invoices){
  		this.invoices = invoices;
  	}
  	return this.invoices;
  }

  storeInvoice(data): void{
  	this.storeData(data, ITEM_STORED_NAME);
  }

  deleteInvoiceStorage(): void{    
    localStorage.removeItem(ITEM_STORED_NAME);
  }

  saveInvoices():IInvoice[]{
  	this.storeData(this.invoices, COLLECTION_STORED_NAME);
    return this.invoices;
  }
  	
  getDataForm(): IInvoice{  		
  	const item = JSON.parse(localStorage.getItem(ITEM_STORED_NAME));
  	const defaultValues: IInvoice = this.getDefaultValues();
  	return (item) ? Object.assign(defaultValues, item) : defaultValues;
  }

  getDefaultValues(): IInvoice{
  	return {id: null, net: 0, tax: 0, total: 0};
  }

  add(invoice): IInvoice[]{  	  	
    if(!invoice.total){
      invoice.total = invoice.net * (1 + parseFloat(invoice.tax));  
    }
  	this.invoices.push(invoice);    
    this.deleteInvoiceStorage();
    return this.saveInvoices();
  }

  remove(id: number): IInvoice[]{
  	this.invoices = this.invoices.filter((invoice)=>invoice.id !=id);
    this.saveInvoices();
  	return this.invoices;
  }

  deleteAll(): void{
  	this.invoices = [];
  	this.saveInvoices();
  }

  private storeData(data, item){
  	const dataToStore = JSON.stringify(data);
    localStorage.setItem(item, dataToStore);
  }

  //Weather API
  getLocationKey(position: IPosition): Observable<{ [key: string]: any } | null>{  		
  	const url: string = `${API_WEATHER_URL}locations/v1/cities/geoposition/search.json`;

  	const httpParams = new HttpParams()
            .set('apikey', API_WEATHER_KEY)
	        .set('q', `${position.lat},${position.lng}`);  		

  	return this.http.get(url, {params: httpParams})
        .pipe(      			
      		catchError((error)=>{
              return [error];
      		})
    	);
  }

  getCurrentConditions(locationKey: number): Observable<{ [key: string]: any } | null>{  		  	
  	const url: string = `${API_WEATHER_URL}forecasts/v1/daily/5day/${locationKey}`;

  	const httpParams = new HttpParams().set('apikey', API_WEATHER_KEY);	            

  	return this.http.get(url, {params: httpParams})
    	.pipe(
    		catchError((error)=>{
              return [error];
      		})
    	);
  	}

   //Modal
  toggleModal(show: boolean = true){
    if(show === true){
      $(MODAL_DELETE).addClass('show');
    }else{
      $(MODAL_DELETE).removeClass('show');  
    }      
  }
}