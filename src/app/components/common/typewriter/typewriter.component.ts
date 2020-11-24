import {Component, OnInit, Input} from '@angular/core';
import {Observable, interval} from 'rxjs';
import {map, takeWhile} from 'rxjs/operators';

@Component({
  selector: 'app-typewriter',
  templateUrl: './typewriter.component.html',
  styleUrls: ['./typewriter.component.less']
})
export class TypewriterComponent implements OnInit {

  private mBlink = true;
  public get blink() {
    return this.mBlink;
  }

  private mCurrentText = '';
  public get currentText() {
    return this.mCurrentText;
  }

  private mText = '...';
  @Input()
  public get text() {
    return this.mText;
  }
  public set text(value: string) {
    this.mText = value || '...';
    this.transition();
  }

  private mInterval = 100;
  @Input()
  public get interval() {
    return this.mInterval;
  }
  public set interval(value: number) {
    this.mInterval = Math.floor(value);
    this.transition();
  }

  private timer: Observable<string>;

  constructor() {}

  ngOnInit() {

  }

  private transition() {
    this.mBlink = true;
    this.timer = interval(this.interval)
      .pipe(takeWhile(() => {
        if (this.mCurrentText === this.mText) {
          this.mBlink = false;
          return false;
        } else {
          return true;
        }
      }))
      .pipe(map(_ => {
        this.step();
        return this.mCurrentText;
      }));

    this.timer.forEach(() => {});
  }

  private step() {
    if (this.mText.startsWith(this.mCurrentText)) {
      let i: number;
      for (i = 0; i < Math.min(this.text.length, this.mCurrentText.length); ++i) {
        if (this.mText[i] !== this.mCurrentText[i]) {
          break;
        }
      }
      this.mCurrentText += this.mText[i];
    } else {
      this.mCurrentText = this.mCurrentText.substr(0, this.mCurrentText.length - 1);
    }
  }

}
