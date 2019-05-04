import { 
  Component,
  OnInit,
  AfterContentInit,
  ElementRef,
  OnDestroy,
  Output,
  EventEmitter,
  Input,
  ViewChild,
  ViewChildren,
  ContentChildren,
  QueryList,
} from '@angular/core';
import PerfectScrollbar from 'src/assets/js/perfect-scrollbar/dist/perfect-scrollbar';
import { ScrollpaneSectionComponent } from '../scrollpane-section/scrollpane-section.component';
import { ScrollService } from 'src/app/services/scroll.service';
import { SvgCanvasService } from 'src/app/services/svg-canvas.service';

@Component({
  selector: 'app-scrollpane',
  templateUrl: './scrollpane.component.html',
  styleUrls: ['./scrollpane.component.less']
})
export class ScrollpaneComponent implements OnInit, OnDestroy, AfterContentInit {

  private ps: PerfectScrollbar

  showBoxShadowTop: boolean = false
  showBoxShadowBottom: boolean = false;

  private resizeListener = () => { console.log('ps update'); this.ps.update() }

  public get offsetTop(): number {
    return this.scrollpane.nativeElement.scrollTop
  }
  public set offsetTop(value: number) {
    this.scrollpane.nativeElement.scrollTop = value
  }
  private bottom: boolean = false
  private top: boolean = true

  private updateActiveSections = () => {}

  private lines = []

  @Input() boxShadows: boolean = true

  @Output() reachStart = new EventEmitter<any>()
  @Output() reachEnd = new EventEmitter<any>()
  @Output() scrollUp = new EventEmitter<any>()
  @Output() scrollDown = new EventEmitter<any>()

  @ViewChild('scrollpane') scrollpane: ElementRef
  @ViewChildren('hr') hrs: QueryList<ElementRef>;
  @ContentChildren(ScrollpaneSectionComponent) sections: QueryList<ScrollpaneSectionComponent>
  
  constructor(
    private scrollService: ScrollService,
    private svgCanvas: SvgCanvasService,
  ) { 

  }
  
  ngOnInit() {
    ;(window as any).scrollpane = this
  }
  ngAfterContentInit() {
    this.ps = new PerfectScrollbar(this.scrollpane.nativeElement)
    if (this.sections && this.sections.length > 0) {
      this.initSections()
    }
    window.addEventListener('resize', this.resizeListener)
  }
  ngOnDestroy() {
    this.ps.destroy()
    window.removeEventListener('resize', this.resizeListener)
    this.lines.forEach(l => this.svgCanvas.deleteElement(l))
  }

  initSections() {
    console.log('initsections')
    this.sections.forEach(s => {
      console.log(s)
      s.requestScroll.subscribe(event => {
        this.scrollTo(s)
      })
    })
    this.updateActiveSections = () => {
      let top = this.offsetTop
      if (this.top) {
        let section = this.sections.first
        this.sections.forEach(s => s.setActiveNoScroll(s == section))
        return
      }
      if (this.bottom) {
        let section = this.sections.last
        this.sections.forEach(s => s.setActiveNoScroll(s == section))
        return
      }
      for (let section of this.sections.toArray()) {
        if (top + 50 < section.offsetTop + section.height) {
          this.sections.forEach(s => s.setActiveNoScroll(s == section))
          return
        }
      }
    }
    this.createLines()
    this.sections.changes.subscribe(c => {
      this.createLines()
    })
    setTimeout(() => this.updateLines(), 50)
    this.updateActiveSections()
  }

  scrollTo(section: ScrollpaneSectionComponent) {
    this.sections.forEach(s => s.setActiveNoScroll(s == section))
    let offset = section == this.sections.first ? 0 : -30
    this.scrollService.scrollTo( this, section.el.nativeElement, 700, offset )
      .subscribe(() => this.updateLines())
  }

  onReachTop(event) {
    this.showBoxShadowTop = true
    this.top = true
    this.reachStart.emit(event)
    this.updateActiveSections()
  }
  onReachBottom(event) {
    this.reachEnd.emit(event)
    this.bottom = true
    this.updateActiveSections()
  }
  onScrollDown(event) {
    this.showBoxShadowTop = true
    this.scrollDown.emit(event)
    this.top = false
    this.updateActiveSections()
    this.updateLines()
  }
  onScrollUp(event) {
    this.scrollUp.emit(event)
    this.bottom = false
    this.updateActiveSections()
    this.updateLines()
  }

  createLines() {
    this.lines = this.sections.filter(s=>s!==this.sections.last).map(s => {
      let line = this.svgCanvas.polyline()
      line.strokeWidth = '1px'
      line.stroke = '#CCC'
      return line
    })
  }
  updateLines() {
    if (!this.hrs) return
    this.sections.filter(s=>s!==this.sections.last).forEach((s, i) => {
      let line = this.lines[i]
      if (!line) return
      let hr: HTMLHRElement = this.hrs.toArray()[i].nativeElement
      let r = hr.getBoundingClientRect()
      let r1 = s.hrRect
      let p0 = { x: r.left, y: r.top + r.height*0.5 }
      let p3 = { x: r1.left + r1.width, y: r1.top + r1.height*0.5 }
      let p1 = { x: r.left + r.width + 0.5*(r1.left - r.left - r.width), y: p0.y }
      let p2 = { x: p1.x, y: p3.y }
      let pts = [
        p0, p1, p2, p3
      ]
      line.points = pts
      line.end = s.lineConnectionPoint
      line.start = {
        x : r.left + r.width,
        y : r.top + r.height * 0.5
      }
    })
  }
}
