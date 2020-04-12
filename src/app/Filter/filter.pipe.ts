import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  filterArr:any[]=[];

  newArr:any[] = [];

  transform(value) {

  let timestamp = new Date(value);
  
  let hours = timestamp.getUTCHours()

  let minutesfn = ()=>
  {
    let timestampMinutes = timestamp.getUTCMinutes()
    if(timestampMinutes==0)
    {
      return "00"
    }
    else
    {
      return timestampMinutes
    }
  }

  let minutes = minutesfn();
  
  let meridiem;

  if(hours >=13 && hours <= 23 )
  {
    let convertedHour = hours - 12;
    hours = convertedHour;
    meridiem = "PM"
  }
  else
  {
    meridiem = "AM"
  }

  return `${hours}:${minutes} ${meridiem}`
    
    
  }

}
