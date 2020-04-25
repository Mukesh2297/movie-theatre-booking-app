import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value) {

  const timestamp = new Date(value);

  let hours = timestamp.getUTCHours();

  const minutesfn = () => {
    const timestampMinutes = timestamp.getUTCMinutes();

    if (timestampMinutes < 10) {
      return `${0}${timestampMinutes}`;
    } else {
      return timestampMinutes;
    }

  };

  const minutes = minutesfn();

  let meridiem;

  if (hours >= 13 && hours <= 23 ) {
    const convertedHour = hours - 12;
    hours = convertedHour;
    meridiem = 'PM';
  } else {
    meridiem = 'AM';
  }

  return `${hours}:${minutes} ${meridiem}`;


  }

}
