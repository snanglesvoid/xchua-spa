import {Component, OnInit, OnDestroy} from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.less']
})
export class ContactComponent implements OnInit, OnDestroy {
  enquirySubmitted = false;
  submitted = false;

  constructor() {}

  ngOnInit() {
  }
  ngOnDestroy() {
  }
}
