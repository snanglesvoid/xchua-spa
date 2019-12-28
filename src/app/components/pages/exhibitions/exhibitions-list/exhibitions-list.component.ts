import {
  Component,
  OnInit,
  AfterContentInit,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  HostBinding,
  HostListener
} from "@angular/core";
import { Exhibition } from "src/app/models/Exhibition";
import { GallerySpace } from "src/app/models/GallerySpace";

@Component({
  selector: "app-exhibitions-list",
  templateUrl: "./exhibitions-list.component.html",
  styleUrls: ["./exhibitions-list.component.less"]
})
export class ExhibitionsListComponent implements OnInit, AfterContentInit {
  private _exhibitions: Exhibition[] = [];
  @Input()
  public get exhibitions() {
    return this._exhibitions;
  }
  public set exhibitions(value) {
    this._exhibitions = value;
    if (!value) return;
    this._berlin = [];
    this._beijing = [];

    this._exhibitions.forEach(x => {
      if (
        (typeof x.location === "string" && x.location === "Berlin") ||
        (x.location as GallerySpace).getModel().location.english === "Berlin"
      ) {
        this._berlin.push(x);
      } else {
        this._beijing.push(x);
      }
    });
    this.change.emit(this.height());
  }

  height() {
    return (this.el.nativeElement as HTMLDivElement).getBoundingClientRect()
      .height;
  }

  @Output() change = new EventEmitter<any>();

  @HostBinding("class.highlight")
  @Input()
  highlight = false;

  private _berlin: Exhibition[] = [];
  private _beijing: Exhibition[] = [];
  // private _indices: any[]
  public get berlin() {
    return this._berlin;
  }
  public get beijing() {
    return this._beijing;
  }
  // public get indices() { return this._indices }

  constructor(private el: ElementRef) {}

  ngOnInit() {}

  @HostBinding("class.single-col") singleCol: boolean = false;
  @HostListener("window:resize")
  updateSingleCol() {
    // console.log('update single col')
    this.singleCol = this.el.nativeElement.getBoundingClientRect().width < 760;
  }

  trackByFn(index: number, e: Exhibition) {
    return e ? e.id : "undefined";
  }

  ngAfterContentInit() {
    this.updateSingleCol();
  }
}
