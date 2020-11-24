import {Component, OnInit, HostBinding} from '@angular/core';
import {InquireService} from 'src/app/services/inquire.service';

@Component({
  selector: 'app-contact-modal',
  templateUrl: './contact-modal.component.html',
  styleUrls: ['./contact-modal.component.less']
})
export class ContactModalComponent implements OnInit {

  constructor(
    public inquire: InquireService
  ) {}

  ngOnInit() {
  }

  @HostBinding('class.visible')
  public get visible() {
    return this.inquire.isOpen;
  }
}
