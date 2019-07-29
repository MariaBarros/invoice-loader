import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customNumber'
})

export class CustomNumberPipe implements PipeTransform {

  transform(value: string, args: number): string {  	
  	for(let i = value.length; i < args; i ++){
  		value = `0${value}`;
  	}
    return value;
  }
}