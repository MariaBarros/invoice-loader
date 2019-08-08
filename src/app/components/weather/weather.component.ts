import { Component, OnInit } from '@angular/core';
import { InvoiceService } from '../../services/invoice.service';
import { IPosition } from '../../data/interfaces';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  //Forecast data
  private forecast:any;

  constructor(private invoiceService: InvoiceService) { }

  ngOnInit() {
  	//if the navigator geolocation is available, get the current user position
  	if (navigator.geolocation) {
 		this.getUserCurrentPosition();
 	}
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

	private getWeatherData(position: IPosition):void{
		this.invoiceService.getLocationKey(position).subscribe((response)=>{			
		  	if(response && response.Key){		  		
		  		this.invoiceService.getCurrentConditions(response.Key).subscribe((response)=>{   
		  			this.forecast = response;		
		  		});
		  	}		  		
		});
	}	

}