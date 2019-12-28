import { Component, OnInit, OnDestroy } from "@angular/core";
import {
  NavToggleComponent,
  NAV_TOGGLE
} from "../../nav/nav-toggle/nav-toggle.component";
import { LOGO_COMPONENT } from "../../logo/logo.component";

@Component({
  selector: "app-page-not-found",
  templateUrl: "./page-not-found.component.html",
  styleUrls: ["./page-not-found.component.less"]
})
export class PageNotFoundComponent implements OnInit, OnDestroy {
  constructor() {}

  ngOnInit() {
    NAV_TOGGLE.color = LOGO_COMPONENT.textColor = "white";
  }

  ngOnDestroy() {
    NAV_TOGGLE.color = LOGO_COMPONENT.textColor = "black";
  }
}
