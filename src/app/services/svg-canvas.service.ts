import { Injectable } from '@angular/core';
import * as Bezier from 'bezier-js'

@Injectable({
  providedIn: 'root'
})
export class SvgCanvasService {

  constructor() { 
    this.elements = []
    this.initCanvas()
    // let c = this.circle()
    // c.fill = 'red'
    // c.center = { x: 200, y: 200 }
    // c.radius = 50;
    // ;(window as any).Bezier = Bezier
  }

  private svgContainer: HTMLElement
  private svg: SVGSVGElement
  private g: SVGGElement

  private elements: CanvasElement[]

  private initCanvas() {

    this.svgContainer = document.createElement('div')
    this.svgContainer.style.position = 'fixed'
    this.svgContainer.style.top = '0'
    this.svgContainer.style.height = '100vh'
    this.svgContainer.style.left = '0'
    this.svgContainer.style.width = '100vw'
    this.svgContainer.style.pointerEvents = 'none'
    this.svgContainer.style.zIndex = '800'
    document.querySelector('body').appendChild(this.svgContainer)

    this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    // this.svg.style.marginTop = '100px'
    this.svgContainer.appendChild(this.svg)

    this.g = document.createElementNS('http://www.w3.org/2000/svg', 'g')
    // this.g.setAttribute('transform', 'translate(0,-100)')
    this.svg.appendChild(this.g)
    
    window.addEventListener('resize', event => this.resize())
    this.resize()

    ;(window as any).canvas = this;
  }
  
  private resize() {
    let viewportRect = this.svgContainer.getBoundingClientRect()

    let w = viewportRect.width
    let h = viewportRect.height

    if (w <= 768) {
      this.svg.style.display = 'none'
    }

    this.svg.setAttribute('width', w.toString())
    this.svg.setAttribute('height', h.toString())
    this.svg.setAttribute('viewbox', `0 0 ${w} ${h}`)
    this.render()
  }

  private render() {

  }

  public clear() {
    this.elements.forEach(e => {
      this.g.removeChild(e.getElement())
    })
    this.elements = []
  }

  public circle() {
    let circle = new CanvasCircle()
    this.elements.push(circle)
    this.g.appendChild(circle.getElement())
    return circle
  }
  public line() {
    let line = new CanvasLine()
    this.elements.push(line)
    this.g.appendChild(line.getElement())
    return line
  }
  public bezier() {
    let bezier = new CanvasBezier()
    this.elements.push(bezier)
    this.g.appendChild(bezier.getElement())
    return bezier
  }
  public polyline(animate: boolean = false) {
    let polyline = new CanvasPolyline()
    if (animate) polyline.className = 'path-animate'
    this.elements.push(polyline)
    this.g.appendChild(polyline.getElement())
    return polyline
  }
  public deleteElement(e: CanvasElement) {
    this.g.removeChild(e.getElement())
    this.elements = this.elements.filter(x => x !== e)
  }
}

export interface CanvasPoint {
  x: number;
  y: number;
}
abstract class CanvasElement {
  public abstract getElement() : SVGElement

  public get transform() {
    return this.getElement().getAttribute('transform')
  }
  public set transform(t: string) {
    this.getElement().setAttribute('transform', t)
  }

  public get className () {
    return this.getElement().getAttribute('class')
  }
  public set className(value) {
    this.getElement().setAttribute('class', value)
  }
}

export class CanvasCircle extends CanvasElement {

  private circle: SVGCircleElement

  public get center() {
    return {
      x: +this.circle.getAttribute('cx'),
      y: +this.circle.getAttribute('cy'),
    }
  }
  public set center(c: CanvasPoint) {
    this.circle.setAttribute('cx', c.x.toString())
    this.circle.setAttribute('cy', c.y.toString())
  }

  public get radius() {
    return +this.circle.getAttribute('r')
  }
  public set radius(r: number) {
    this.circle.setAttribute('r', r.toString())
  }

  public get fill() {
    return this.circle.getAttribute('fill')
  }
  public set fill(value: string) {
    this.circle.setAttribute('fill', value)
  }

  constructor() {
    super()
    this.circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
  }

  getElement(): SVGCircleElement {
    return this.circle
  }
}


export class CanvasRect extends CanvasElement {
  private rect: SVGRectElement

  constructor() {
    super()
    this.rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
  }

  getElement(): SVGRectElement {
    return this.rect
  }
}

export class CanvasLine extends CanvasElement {
  private line: SVGLineElement

  private _stroke : string
  private _strokeWidth : string
  private _strokeLinecap : string

  public get start(): CanvasPoint {
    return {
      x: +this.line.getAttribute('x1'),
      y: +this.line.getAttribute('y1'),
    }
  }
  public set start(p: CanvasPoint) {
    this.line.setAttribute('x1', p.x.toString())
    this.line.setAttribute('y1', p.y.toString())
  }
  public get end(): CanvasPoint {
    return {
      x: +this.line.getAttribute('x2'),
      y: +this.line.getAttribute('y2'),
    }
  }
  public set end(p: CanvasPoint) {
    this.line.setAttribute('x2', p.x.toString())
    this.line.setAttribute('y2', p.y.toString())
  }
  public get strokeWidth() {
    return this._strokeWidth
  }
  public set strokeWidth(w: string) {
    this._strokeWidth = w
    this.setStyle()
  }
  public get stroke() {
    return this._stroke
  }
  public set stroke(s: string) {
    this._stroke = s
    this.setStyle()
  }
  public get strokeLinecap() {
    return this._strokeLinecap
  }
  public set strokeLinecap(sl: string) {
    this._strokeLinecap = sl
    this.setStyle()
  }

  constructor() {
    super()
    this.line = document.createElementNS('http://www.w3.org/2000/svg', 'line')
  }

  getElement(): SVGLineElement {
    return this.line
  }

  private setStyle() {
    this.line.setAttribute('style', `stroke:${this._stroke}; stroke-width:${this._strokeWidth}; stroke-linecap:${this._strokeLinecap}`)
  }
}

export class CanvasBezier extends CanvasElement {
  private path: SVGPathElement
  private bezier: any
  private _points: CanvasPoint[] = []
  private _stroke: string = '#000'
  private _strokeWidth: string = '1px'
  private _strokeLinecap: string = 'round'
  private _fill: string = 'none'
  private _close: boolean = false
  private _resolution: number = 50

  public set points(pts: CanvasPoint[]) {
    this._points = pts
    this.render()
  }
  public get points() {
    return this._points
  }

  public get stroke() {
    return this._stroke
  }
  public set stroke(s: string) {
    this._stroke = s
    this.setStyle()
  }
  public get resolution() {
    return this._resolution
  }
  public set resolution(value: number) {
    value = Math.round(value)
    this._resolution = value
    this.render()
  }

  public get strokeWidth() {
    return this._strokeWidth
  }
  public set strokeWidth(value: string) {
    this._strokeWidth = value
    this.setStyle()
  }

  public get strokeLinecap() {
    return this._strokeLinecap
  }
  public set strokeLinecap(value: string) {
    this._strokeLinecap = value
    this.setStyle()
  }

  public get fill() {
    return this._fill
  }
  public set fill(value: string) {
    this._fill = value
    this.setStyle()
  }

  public get close() {
    return this._close
  }
  public set close(value: boolean) {
    this._close = value
    this.render()
  }

  constructor() {
    super()
    this.path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
    this.setStyle()
  }

  getElement(): SVGPathElement {
    return this.path
  }

  private render() {
    if (this._points.length < 3) return 
    this.bezier = new Bezier(this._points)
    let ps = this.bezier.getLUT(this._resolution)
    let p0 = ps.shift(1)
    let d = `M${p0.x} ${p0.y} ${ps.map(p => `L${p.x} ${p.y}`).reduce((a,b)=>a+' '+b)} ${this._close ? 'Z' : ''}`
    this.path.setAttribute('d', d)
  }
 
  private setStyle() {
    this.path.setAttribute('style', `stroke:${this._stroke};stroke-width:${this._strokeWidth};stroke-linecap:${this._strokeLinecap};fill:${this._fill}`)
  }

}

export class CanvasPolyline extends CanvasElement {
  private path: SVGPathElement
  private _points: CanvasPoint[] = []
  private _stroke: string = '#000'
  private _strokeWidth: string = '1px'
  private _strokeLinecap: string = 'round'
  private _fill: string = 'none'
  private _close: boolean = false

  public set points(pts: CanvasPoint[]) {
    this._points = pts
    this.render()
  }
  public get points() {
    return this._points
  }

  public get stroke() {
    return this._stroke
  }
  public set stroke(s: string) {
    this._stroke = s
    this.setStyle()
  }
  public get strokeWidth() {
    return this._strokeWidth
  }
  public set strokeWidth(value: string) {
    this._strokeWidth = value
    this.setStyle()
  }

  public get strokeLinecap() {
    return this._strokeLinecap
  }
  public set strokeLinecap(value: string) {
    this._strokeLinecap = value
    this.setStyle()
  }

  public get fill() {
    return this._fill
  }
  public set fill(value: string) {
    this._fill = value
    this.setStyle()
  }

  public get close() {
    return this._close
  }
  public set close(value: boolean) {
    this._close = value
    this.render()
  }

  constructor() {
    super()
    this.path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
  }

  private setStyle() {
    this.path.setAttribute('style', `stroke:${this._stroke};stroke-width:${this._strokeWidth};stroke-linecap:${this._strokeLinecap};fill:${this._fill}`)
  }
  private render() {
    if (this._points.length < 3) return 
    let ps = [...this.points]
    let p0 = ps.shift()
    let d = `M${p0.x} ${p0.y} ${ps.map(p => `L${p.x} ${p.y}`).reduce((a,b)=>a+' '+b)} ${this._close ? 'Z' : ''}`
    this.path.setAttribute('d', d)
  }
  getElement() {
    return this.path
  }
}