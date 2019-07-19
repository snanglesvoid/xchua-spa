import { Pipe, PipeTransform } from '@angular/core'
import { Fair } from '../models'

@Pipe({
  name: 'fairDateFilter',
})
export class FairDateFilterPipe implements PipeTransform {
  transform(value: Fair[], args?: any): any {
    if (!value) return value
    let d = new Date()
    if (args === 'past') {
      return value.filter(x => x.end < d)
    } else {
      return value.filter(x => x.end >= d)
    }
  }
}
