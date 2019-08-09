import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customNumber'
})

export class CustomNumberPipe implements PipeTransform {

  transform(value: any, args: number): string {  

  	if(typeof(value) === "number"){
  		value = value.toString();
  	}
  	
  	for(let i = value.length; i < args; i ++){
  		value = `0${value}`;
  	}
  	
    return value;
  }
}