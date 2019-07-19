import { Pipe, PipeTransform } from '@angular/core'
import { Exhibition } from '../models/Exhibition'

@Pipe({
  name: 'exDateFilter',
})
export class ExDateFilterPipe implements PipeTransform {
  transform(value: Exhibition[], args?: any): any {
    if (!value) return value
    // console.log('pipe transform')
    let d = new Date()
    if (args === 'past') {
      return value.filter(x => x.end < d)
    }
    if (args === 'upcoming') {
      return value.filter(x => x.start > d)
    }
    if (args === 'current') {
      return value.filter(x => x.end >= d && x.start <= d)
    }
    return []
  }
}
