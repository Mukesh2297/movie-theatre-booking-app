import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: string) {

    let name = value;

    console.log(name);
    
    let nameArr = [];

    nameArr.push(value);

    console.log(nameArr);
    
    
    // if(nameArr.indexOf(value) != -1 )
    // {
    //   nameArr.push(value);
    //   console.log(nameArr);
    // }  
  }

}
