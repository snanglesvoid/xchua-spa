import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
} from '@angular/core'
// import { trigger, animate, style } from '@angular/animations'
import { ArtworkSeries, Artwork } from 'src/app/models'
import {
  CanvasPolyline,
  SvgCanvasService,
} from 'src/app/services/svg-canvas.service'

enum ViewState {
  CAROUSEL = 0,
  COLLAGE = 1,
}

@Component({
  selector: 'app-artwork-series',
  templateUrl: './artwork-series.component.html',
  styleUrls: ['./artwork-series.component.less'],
  animations: [],
})
export class ArtworkSeriesComponent implements OnInit {
  constructor(private canvas: SvgCanvasService) {}

  ngOnInit() {
    ;(window as any)['series_' + new Date().getTime()] = this
  }

  @Input() series: ArtworkSeries

  @Output() loaded = new EventEmitter<any>()
  @Output() bottomReached = new EventEmitter<boolean>()

  bottomViewport($event) {
    this.bottomReached.emit($event == 0)
  }

  activeIndex($event) {
    console.log($event)
    this.activeWork = this.series.artworks[$event]
  }

  // @ViewChild('container') container: ElementRef
  // mouseX = 0
  // mouseY = 0
  // polyline: CanvasPolyline
  // containerMouseEnter(event: MouseEvent) {
  //   console.log('cont mouse enter')
  //   this.mouseX = event.clientX
  //   this.mouseY = event.clientY
  //   this.polyline = this.canvas.polyline(true)
  //   this.polyline.stroke = '#373334'
  //   this.polyline.strokeWidth = '2px'
  //   this.updateCursor()
  // }
  // containerMouseLeave(event: MouseEvent) {
  //   console.log('cont mouse leave')
  //   this.canvas.deleteElement(this.polyline)
  //   this.polyline = null
  // }
  // containerMouseMove(event: MouseEvent) {
  //   console.log('cont mouse move')
  //   this.mouseX = event.clientX
  //   this.mouseY = event.clientY
  //   this.updateCursor()
  // }
  // updateCursor() {
  //   if (
  //     this.mouseX > this.container.nativeElement.getBoundingClientRect().width
  //   ) {
  //     this.polyline.points = [
  //       { x: this.mouseX - 15, y: this.mouseY - 15 },
  //       { x: this.mouseX, y: this.mouseY },
  //       { x: this.mouseX - 15, y: this.mouseY + 15 },
  //     ]
  //   } else {
  //     this.polyline.points = [
  //       { x: this.mouseX + 15, y: this.mouseY - 15 },
  //       { x: this.mouseX, y: this.mouseY },
  //       { x: this.mouseX + 15, y: this.mouseY + 15 },
  //     ]
  //   }
  // }

  activeWork: Artwork

  view: ViewState = ViewState.CAROUSEL
}
