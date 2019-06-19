import { Observable, timer } from 'rxjs'
import { concatMap, map, scan } from 'rxjs/operators'

const timeOf = (interval: number) => <T>(val: T) =>
  timer(interval).pipe(map(_ => val))

export const timed = (interval: number) => <T>(source: Observable<T>) =>
  source.pipe(
    concatMap(timeOf(interval)),
    map(x => [x]),
    scan((acc, val) => [...acc, ...val])
  )
