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

  saveInvoices():void{
  	this.storeData(this.invoices, COLLECTION_STORED_NAME);
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
  	this.invoices.push(invoice);
    if(!invoice.total){
      invoice.total = parseFloat(invoice.net) * (1 + parseFloat(invoice.tax)/100);  
    }
    this.deleteInvoiceStorage();
  	return this.invoices;
  }

  remove(id: number): IInvoice[]{
  	this.invoices = this.invoices.filter((invoice)=>invoice.id !=id);
  	return this.invoices;
  }

  deleteAll(): void{
  	this.invoices = [];
  	this.saveInvoices();
  }

  private storeData(data, item){
  	const dataToStore = JSON.stringify(data);
    localStorage.setItem(ITEM_STORED_NAME, dataToStore);
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

}