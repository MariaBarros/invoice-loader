import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customDecimal'
})

export class CustomDecimalPipe implements PipeTransform {

  transform(value: string, args?: any): string {    
    const parsesVal = value.split('.');
    if(!parsesVal || parsesVal.length === 0){
    	return value;
    }
	parsesVal[0] = parsesVal[0].replace (',','.');
	return parsesVal.join(',');    
  }

}
