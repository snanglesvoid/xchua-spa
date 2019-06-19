import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs'

@Component({
  selector: 'app-libary',
  templateUrl: './libary.component.html',
  styleUrls: ['./libary.component.less']
})
export class LibaryComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    this.images = [
      'http://res.cloudinary.com/xc-hua/image/upload/c_limit,h_1600,w_1600/skp6pkskmoannbbljyoj',
      'http://res.cloudinary.com/xc-hua/image/upload/c_limit,h_1600,w_1600/ict0muzx6u30hlgccjbl'
    ]

    interval(6000).subscribe(x => this.activeIndex = x)

  }

  loadingProgress(event) {
    console.log('loading progress', event)
    this.progress = event

  }
  images = []
  progress = 0
  activeIndex = 0

  displacementImage="assets/images/displacement/2.jpg"

}
