import { Directive, ElementRef, Output, EventEmitter, OnInit, OnDestroy, AfterContentInit } from '@angular/core';
import 'imagesloaded'

@Directive({
  selector: '[imagesLoaded]'
})
export class ImagesLoadedDirective implements OnInit, AfterContentInit,  OnDestroy {

  constructor(
    private el: ElementRef
  ) { 

  }

  private imgLoad
  private progress


  ngOnInit() {
    
  }
  ngAfterContentInit() {
    this.imgLoad = imagesLoaded(this.el.nativeElement)
    this.imgLoad.on('done', instance => this.onDone(instance))
    this.imgLoad.on('progress', this.onProgress)
    this.imgLoad.on('fail', this.onFail)
  }

  ngOnDestroy() {

  }

  onProgress(instance, image) {
    // console.log('progress', instance, image)
  }
  onDone(instance) {
    // console.log('images loaded', instance)
    this.imagesLoaded.emit(instance)
  }
  onFail(instance) {
    // console.log('fail', instance)
  }

  @Output() imagesLoaded = new EventEmitter<any>()


}
