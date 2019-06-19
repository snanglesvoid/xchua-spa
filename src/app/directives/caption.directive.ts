import {
  Directive,
  ElementRef,
  HostListener,
  OnInit,
  Input,
} from '@angular/core'

@Directive({
  selector: '[caption]',
})
export class CaptionDirective implements OnInit {
  constructor(private el: ElementRef) {}

  @Input() caption: string

  ngOnInit() {
    let element = this.el.nativeElement as HTMLElement
    let pos = element.style.position
    if (pos !== 'absolute') {
      element.style.position = 'relative'
    }
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    this.hover = true
    // console.log('hover', this.hover)
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.hover = false
    // console.log('hover', this.hover)
  }

  hover: boolean = false
}
