import { Component, OnInit, Input } from "@angular/core";
import {
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes
} from "@angular/animations";

@Component({
  selector: "app-logo",
  templateUrl: "./logo.component.html",
  styleUrls: ["./logo.component.less"],
  animations: [
    trigger("bloat", [
      state(
        "init",
        style({
          transform: "scale(1.0) translate(0, 0)",
          opacity: 1.0
        })
      ),
      state(
        "big",
        style({
          transform: "scale(1.5) translate(-42%, 32%)",
          opacity: 1.0
        })
      ),
      state(
        "small",
        style({
          transform: "scale(1.0) translate(0, 0)",
          opacity: 1.0
        })
      ),
      transition("init => big", [animate(".6s ease-out")]),
      transition("big => small", [animate(".6s .3s ease-out")]),
      transition("small => big", [animate(".6s ease-out")]),
      transition("* => init", [
        animate(
          "2.5s ease-out",
          keyframes([
            style({ transform: "scale(0.0) translate(0, 0)", opacity: 0.0 }),
            style({
              transform: "scale(1.5) translate(-42%, 32%)",
              opacity: 1.0
            }),
            style({ transform: "scale(1.0) translate(0, 0)", opacity: 1.0 })
          ])
        )
      ])
    ]),
    trigger("show-links", [
      state(
        "init",
        style({
          top: "-30px",
          opacity: 0.0
        })
      ),
      state(
        "big",
        style({
          top: "12px",
          opacity: 1.0
        })
      ),
      state(
        "small",
        style({
          top: "-30px",
          opacity: 1.0
        })
      ),
      transition("init => big", [animate(".6s .3s ease-out")]),
      transition("big => small", [animate(".5s ease-out")]),
      transition("small => big", [animate(".6s .3s ease-out")])
    ])
  ]
})
export class LogoComponent implements OnInit {
  @Input() textColor: string = "#000"; //'#cccccc'
  @Input() dotColor: string = "#f00"; //'#373334'

  animationState: "init" | "big" | "small" = "init";
  private logoHover: boolean = false;
  private linksHover: boolean = false;

  constructor() {}

  ngOnInit() {}

  logoMouseover() {
    this.logoHover = true;
    this.updateAnimationState();

    // console.log('logo mouseover', this.animationState)
  }

  logoMouseout() {
    setTimeout(() => {
      this.logoHover = false;
      this.updateAnimationState();
      // console.log('logo mouseout', this.animationState)
    }, 50);
  }
  linksMouseover() {
    this.linksHover = true;
    this.updateAnimationState();
    // console.log('links mouseover', this.animationState)
  }
  linksMouseout() {
    setTimeout(() => {
      this.linksHover = false;
      this.updateAnimationState();
      // console.log('links mouseout', this.animationState)
    }, 50);
  }

  private updateAnimationState() {
    this.animationState = this.logoHover || this.linksHover ? "big" : "small";
  }

  logoClick() {}
}
