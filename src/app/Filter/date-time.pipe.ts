import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateTime'
})
export class DateTimePipe implements PipeTransform {

  transform(value) {

    console.log(value);

    const showTime = new Date(value);

    const date = showTime.getDate();

    const month = showTime.toLocaleString('default', { month: 'short' });

    const year = showTime.getFullYear();


    let hours = showTime.getUTCHours();

    const minutesfn = () => {
    const showTimeMinutes = showTime.getUTCMinutes();

    if (showTimeMinutes < 10) {
      return `${0}${showTimeMinutes}`;
    } else {
      return showTimeMinutes;
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

    const bookedShowTime = `${date}-${month}-${year}, ${hours}:${minutes} ${meridiem}`;

    return bookedShowTime;
  }

}
