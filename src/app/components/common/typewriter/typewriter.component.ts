import { Component, OnInit, Input } from "@angular/core";
import { Observable, interval } from "rxjs";
import { map, takeWhile } from "rxjs/operators";

@Component({
  selector: "app-typewriter",
  templateUrl: "./typewriter.component.html",
  styleUrls: ["./typewriter.component.less"]
})
export class TypewriterComponent implements OnInit {
  private _blink: boolean = true;
  public get blink() {
    return this._blink;
  }

  private _currentText: string = "";
  public get currentText() {
    return this._currentText;
  }

  private _text: string = "...";
  @Input()
  public get text() {
    return this._text;
  }
  public set text(value: string) {
    this._text = value || "...";
    this.transition();
  }

  private _interval: number = 150;
  @Input()
  public get interval() {
    return this._interval;
  }
  public set interval(value: number) {
    this._interval = Math.floor(value);
    this.transition();
  }

  private timer: Observable<string>;

  constructor() {}

  ngOnInit() {}

  private transition() {
    this._blink = true;
    this.timer = interval(this.interval)
      .pipe(
        takeWhile(() => {
          if (this._currentText === this._text) {
            this._blink = false;
            return false;
          } else {
            return true;
          }
        })
      )
      .pipe(
        map(_ => {
          this.step();
          return this._currentText;
        })
      );

    this.timer.forEach(_ => {});
  }

  private step() {
    if (this._text.startsWith(this._currentText)) {
      let i;
      for (
        i = 0;
        i < Math.min(this.text.length, this._currentText.length);
        ++i
      ) {
        if (this._text[i] !== this._currentText[i]) break;
      }
      this._currentText += this._text[i];
    } else {
      this._currentText = this._currentText.substr(
        0,
        this._currentText.length - 1
      );
    }
  }
}
