import { Pipe, PipeTransform } from '@angular/core';
import { Exhibition } from '../models/Exhibition';
import { GallerySpace } from '../models/GallerySpace';

@Pipe({
  name: 'exLocationFilter'
})
export class ExLocationFilterPipe implements PipeTransform {

  transform(value: Exhibition[], args?: any): any {
    return value.filter(x => {
      if (typeof x.location == 'string') return x.location === args
      let l = x.location as GallerySpace
      return l.getModel().location.english === args
    })
  }

}
