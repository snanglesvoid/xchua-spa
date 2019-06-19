import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { trigger, animate, style } from '@angular/animations'
import { ArtworkSeries } from 'src/app/models'

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
  constructor() {}

  ngOnInit() {}

  @Input() series: ArtworkSeries

  @Output() loaded = new EventEmitter<any>()
  @Output() bottomReached = new EventEmitter<boolean>()

  bottomViewport($event) {
    this.bottomReached.emit($event == 0)
  }

  view: ViewState = ViewState.CAROUSEL
}
