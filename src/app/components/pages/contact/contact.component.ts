import { Component, OnInit, OnDestroy } from "@angular/core";
import { NAV_TOGGLE } from "../../nav/nav-toggle/nav-toggle.component";
import { LOGO_COMPONENT } from "../../logo/logo.component";

@Component({
  selector: "app-contact",
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact.component.less"]
})
export class ContactComponent implements OnInit, OnDestroy {
  enquirySubmitted: boolean = false;

  constructor() {}

  ngOnInit() {
    NAV_TOGGLE.color = "white";
    LOGO_COMPONENT.textColor = "white";
  }
  ngOnDestroy() {
    NAV_TOGGLE.color = "black";
    LOGO_COMPONENT.textColor = "black";
  }
}
