import {
  Component,
  OnInit,
  Input,
  HostBinding,
  ElementRef
} from "@angular/core";
import {Exhibition} from "src/app/models/Exhibition";

import {
  trigger,
  state,
  animate,
  style,
  transition
} from "@angular/animations";
import {ViewportPosition} from "src/app/directives/scroll-to.directive";
import {LanguageService} from "src/app/services/language.service";

@Component({
  selector: "app-exhibitions-list-item",
  templateUrl: "./exhibitions-list-item.component.html",
  styleUrls: ["./exhibitions-list-item.component.less"],
  animations: [
    trigger("inOut", [
      transition(":enter", [
        style({opacity: 0}),
        animate("600ms ease-out", style({opacity: 1}))
      ]),
      transition(":leave", [
        style({opacity: 1}),
        animate("600ms ease-out", style({opacity: 0}))
      ])
    ])
  ]
})
export class ExhibitionsListItemComponent implements OnInit {
  @Input() exhibition: Exhibition;

  @HostBinding("class.highlight")
  @Input()
  highlight = false;

  @HostBinding("@inOut") inOut = true;

  constructor(private el: ElementRef, public lang: LanguageService) {}

  ngOnInit() {}

  viewportPosition: ViewportPosition = 0;

  inViewportChange(event) {
    // console.log('in Viewport Changed for', this.el.nativeElement, event)
    this.viewportPosition = event;
  }
}
