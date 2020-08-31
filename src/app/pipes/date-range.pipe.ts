import {Pipe, PipeTransform} from '@angular/core';

/* const mns = [ */
/*   'January', */
/*   'Febuary', */
/*   'March', */
/*   'April', */
/*   'May', */
/*   'June', */
/*   'July', */
/*   'August', */
/*   'September', */
/*   'October', */
/*   'November', */
/*   'December' */
/* ]; */

const mns = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
];
const mnsG = [
  'Januar',
  'Februar',
  'März',
  'April',
  'Mai',
  'Juni',
  'Juli',
  'August',
  'September',
  'Oktober',
  'November',
  'Dezember'
];

function formatDateEnglish(date: Date, month = true, year: boolean = true) {
  if (year) {
    return month
      ? `${mns[date.getMonth()]} ${date.getDate()} ${date.getFullYear()}`
      : `${date.getDate()}, ${date.getFullYear()}`;
  } else if (month) {
    return `${mns[date.getMonth()]} ${date.getDate()}`;
  } else {
    return `${date.getDate()}`;
  }
}

function formatDateGerman(date: Date, month = true, year: boolean = true) {
  if (year) {
    return `${date.getDate()}.${mnsG[date.getMonth()]} ${date.getFullYear()}`;
  } else if (month) {
    return `${date.getDate()}.${mnsG[date.getMonth()]}`;
  } else {
    return `${date.getDate()}.`;
  }
}
function formatDateChinese(date: Date, month = true, year: boolean = true) {
  return `${year ? date.getFullYear() + '年' : ''}
    ${month ? date.getMonth() + 1 + '月' : ''}
    ${date.getDate()}日`;
}

@Pipe({
  name: 'dateRange'
})
export class DateRangePipe implements PipeTransform {
  transform(value: {start: Date; end: Date}, lang?: string): any {
    const start = value.start;
    const end = value.end;

    if (start.getFullYear() !== end.getFullYear()) {
      switch (lang) {
        case 'english':
          return `${formatDateEnglish(start)}–${formatDateEnglish(end)}`;
        case 'german':
          return `${formatDateGerman(start)}–${formatDateGerman(end)}`;
        case 'chinese':
          return `${formatDateChinese(start)}–${formatDateChinese(end)}`;
        default:
          throw new Error('unknown language');
      }
    } else if (start.getMonth() !== end.getMonth()) {
      switch (lang) {
        case 'english':
          return `${formatDateEnglish(start, true, false)}–${formatDateEnglish(
            end
          )}`;
        case 'german':
          return `${formatDateGerman(start, true, false)}–${formatDateGerman(
            end
          )}`;
        case 'chinese':
          return `${formatDateChinese(start)}–${formatDateChinese(
            end,
            true,
            false
          )}`;
        default:
          throw new Error('unknown language');
      }
    } else {
      switch (lang) {
        case 'english':
          return `${formatDateEnglish(start, true, false)}–${formatDateEnglish(
            end,
            false,
            true
          )}`;
        case 'german':
          return `${formatDateGerman(start, false, false)}–${formatDateGerman(
            end
          )}`;
        case 'chinese':
          return `${formatDateChinese(start)}–${formatDateChinese(
            end,
            false,
            false
          )}`;
        default:
          throw new Error('unknown language');
      }
    }
  }
}
