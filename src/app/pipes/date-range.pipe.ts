import { Pipe, PipeTransform } from '@angular/core'
import { LanguageService } from '../services/language.service'

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
  'Dec',
]

function formatDateEnglish(date: Date) {
  return `${mns[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
}

function formatDateGerman(date: Date) {
  return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`
}
function formatDateChinese(date: Date) {
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`
}

@Pipe({
  name: 'dateRange',
})
export class DateRangePipe implements PipeTransform {
  transform(value: { start: Date; end: Date }, lang?: string): any {
    let start = value.start
    let end = value.end
    switch (lang) {
      case 'english':
        return `${formatDateEnglish(start)} to ${formatDateEnglish(end)}`
      case 'german':
        return `${formatDateGerman(start)} - ${formatDateGerman(end)}`
      case 'chinese':
        return `${formatDateChinese(start)} - ${formatDateChinese(end)}`
      default:
        throw 'unknown language'
    }
  }
}
