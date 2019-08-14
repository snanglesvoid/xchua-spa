import { Component, OnInit, HostListener, ElementRef } from '@angular/core'
import {
  Scene,
  WebGLRenderer,
  PerspectiveCamera,
  AmbientLight,
  SpotLight,
  Vector3,
  BoxBufferGeometry,
  Mesh,
  LineBasicMaterial,
  PointLight,
  MeshPhongMaterial,
  LineSegments,
  EdgesGeometry,
  FrontSide,
} from 'three'

const LINE_MATERIAL = new LineBasicMaterial({ color: 0x888888 })
const SURFACE_MATERIAL = new MeshPhongMaterial({
  color: 0xffffff,
  side: FrontSide,
  shadowSide: FrontSide,
})

@Component({
  selector: 'gl-shelf',
  templateUrl: './gl-shelf.component.html',
  styleUrls: ['./gl-shelf.component.less'],
})
export class GlShelfComponent implements OnInit {
  constructor(private el: ElementRef<HTMLDivElement>) {}

  ngOnInit() {
    setTimeout(_ => this.setup(), 100)
    ;(window as any).shelf = this
  }

  private setup() {
    this.scene = new Scene()
    this.renderer = new WebGLRenderer({ antialias: true, alpha: true })
    this.renderer.setClearColor(0xffffff, 1)
    this.renderer.setPixelRatio(window.devicePixelRatio)
    // this.renderer.shadowMap.enabled = true
    // this.renderer.shadowMap.type = PCFSoftShadowMap
    this.camera = new PerspectiveCamera(75, 1, 0.01, 200)
    this.camera.position.z = 25
    this.resize()
    this.setupShelf()
    this.setupLights()

    this.el.nativeElement.appendChild(this.renderer.domElement)
    window.requestAnimationFrame(_ => this.animate())
  }
  private wires(geometry, material) {
    let geo = new EdgesGeometry(geometry)
    let wireframe = new LineSegments(geo, material)
    return wireframe
  }
  private setupShelf() {
    //left board
    this.createBoard(0.5, 4 * this.rowHeight + 0.5, this.depth, -20.27, 0, 0)
    //right board
    this.createBoard(0.5, 4 * this.rowHeight + 0.5, this.depth, 20.27, 0, 0)
    //back board
    // this.createBoard(this.shelfWidth, 3*this.rowHeight, .5, 0, 0, -6)
    for (let i = -2; i < 3; ++i) {
      let y = i * this.rowHeight
      this.createBoard(40, 0.5, 6, 0, y, 0)
    }
  }
  private createBoard(w = 40, h = 0.5, d = 6, x = 0, y = 0, z = 0) {
    let boardGeometry = new BoxBufferGeometry(w, h, d)
    boardGeometry.translate(x, y, z)
    let boardWires = this.wires(boardGeometry, LINE_MATERIAL)
    let board = new Mesh(boardGeometry, SURFACE_MATERIAL)
    board.castShadow = true
    board.receiveShadow = true
    this.scene.add(boardWires)
    this.scene.add(board)
    return board
  }
  private setupLights() {
    this.ambience = new AmbientLight(this.lightColor, this.ambienceIntensity)
    this.scene.add(this.ambience)
  }
  private createSpotlight(position: Vector3) {
    let spotlight = new SpotLight(
      this.lightColor,
      this.spotlightIntensity,
      0,
      Math.PI / 2.1,
      1,
      2
    )
    spotlight.position.set(position.x, position.y - 1, position.z)
    spotlight.castShadow = true
    spotlight.target.position.set(
      position.x,
      position.y - this.rowHeight,
      position.z
    )
    this.scene.add(spotlight)
    this.scene.add(spotlight.target)
    this.spotlights.push(spotlight)
    return spotlight
  }

  @HostListener('window:resize')
  resize() {
    let el = this.el.nativeElement
    this.width = el.getBoundingClientRect().width
    this.height = el.getBoundingClientRect().height
    this.camera.aspect = this.width / this.height
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(this.width, this.height)
  }

  animate() {
    window.requestAnimationFrame(_ => this.animate())

    this.renderer.render(this.scene, this.camera)
  }

  private width: number
  private height: number
  private depth: number = 6
  private rowHeight: number = 15
  private shelfWidth: number = 30

  private scene: Scene
  private renderer: WebGLRenderer | SVGRenderer
  private camera: PerspectiveCamera

  private lightColor = 0xffffff
  private ambienceIntensity = 0.6
  private ambience: AmbientLight

  private spotlightIntensity = 0.8
  private spotlights: SpotLight[] = []
  private pointlight: PointLight
  private sphere
}
