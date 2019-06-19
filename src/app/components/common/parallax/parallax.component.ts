import { Component, OnInit, Input, Output, ElementRef, EventEmitter, OnDestroy, ContentChildren, QueryList, AfterContentInit } from '@angular/core';
import Parallax from 'parallax-js';

@Component({
  selector: 'app-parallax',
  template: '<ng-content></ng-content>',
  styles: [`
  :host {
    display: block;
    height: 100%;
    width: 100%;
  }
  `]
})
export class ParallaxComponent implements OnInit, OnDestroy, AfterContentInit {

  constructor(
    private el: ElementRef
  ) { 

  }

  private parallax: any

  @Input() relativeInput: boolean = true
  @Input() clipRelativeInput: boolean = true
  @Input() hoverOnly: boolean = true
  @Input() invertX: boolean = false
  @Input() invertY: boolean = false
  @Input() scalarX: number = 10.0
  @Input() scalarY: number = 10.0
  @Input() frictionX: number = 0.1
  @Input() frictionY: number = 0.1
  @Input() originX: number = 0.5
  @Input() originY: number = 0.5
  @Input() selector: string = null
  @Input() pointerEvents: boolean = false

  @Output() ready = new EventEmitter<any>()

  ngOnInit() {

  }

  ngAfterContentInit() {
    this.parallax = new Parallax(this.el.nativeElement, {
      relativeInput: this.relativeInput,
      clipRelativeInput: this.clipRelativeInput,
      hoverOnly: this.hoverOnly,
      invertX: this.invertX,
      invertY: this.invertY,
      scalarX: this.scalarX,
      scalarY: this.scalarY,
      frictionX: this.frictionX,
      frictionY: this.frictionY,
      originX: this.originX,
      originY: this.originY,
      selector: this.selector,
      pointerEvents: this.pointerEvents,
      onReady: () => this.onReady()
    })
  }

  ngOnDestroy() {
    this.parallax.destroy()
  }

  onReady() {
    this.ready.emit('ready')
  }

}
