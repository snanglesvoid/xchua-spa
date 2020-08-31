import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavColorService {

  constructor() {}

  private tColor = 'black';
  public get textColor() {
    return this.tColor;
  }
  public set textColor(color: string) {
    this.tColor = color;
  }
  private bColor = 'white';
  public get backgroundColor() {
    return this.bColor;
  }
  public set backgroundColor(color: string) {
    this.bColor = color;
  }
}
