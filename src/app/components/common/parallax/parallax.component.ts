import {
  Component,
  OnInit,
  Input,
  Output,
  ElementRef,
  EventEmitter,
  OnDestroy,
  AfterContentInit
} from '@angular/core';

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

  private parallax: any;

  @Input() relativeInput = true;
  @Input() clipRelativeInput = true;
  @Input() hoverOnly = true;
  @Input() invertX = false;
  @Input() invertY = false;
  @Input() scalarX = 10.0;
  @Input() scalarY = 10.0;
  @Input() frictionX = 0.1;
  @Input() frictionY = 0.1;
  @Input() originX = 0.5;
  @Input() originY = 0.5;
  @Input() selector = null;
  @Input() pointerEvents = false;

  @Output() ready = new EventEmitter<any>();

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
    });
  }

  ngOnDestroy() {
    this.parallax.destroy();
  }

  onReady() {
    this.ready.emit('ready');
  }

}
