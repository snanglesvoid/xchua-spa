import { Component, OnInit, OnDestroy } from "@angular/core";
import { NAV_TOGGLE } from "../../nav/nav-toggle/nav-toggle.component";
import { LOGO_COMPONENT } from "../../logo/logo.component";

@Component({
  selector: "app-subscribe",
  templateUrl: "./subscribe.component.html",
  styleUrls: ["./subscribe.component.less"]
})
export class SubscribeComponent implements OnInit, OnDestroy {
  submitted: boolean = false;

  constructor() {}

  ngOnInit() {
    NAV_TOGGLE.color = LOGO_COMPONENT.textColor = "white";
  }
  ngOnDestroy(): void {
    NAV_TOGGLE.color = LOGO_COMPONENT.textColor = "black";
  }

  subscribe() {}
}
