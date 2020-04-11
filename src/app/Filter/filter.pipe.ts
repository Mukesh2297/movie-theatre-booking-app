import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  filterArr:any[]=[];

  newArr:any[] = [];

  transform(value) {

    this.filterArr = value;
   
    this.newArr = this.filterArr.map((element,index)=>
    {
      let obj = {name: element.name}

      return element;

    })

    console.log(this.newArr);
    
    
  }

}
