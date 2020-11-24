import {Component, OnInit, Input, ViewChild} from '@angular/core';
import {Artwork} from 'src/app/models';
import {SmartImageComponent} from 'src/app/components/common/smart-image/smart-image.component';
import {InquireService} from 'src/app/services/inquire.service';
import {ContactFormData} from 'src/app/components/forms/contact-form/contact-form.component';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-vr-artwork',
  templateUrl: './vr-artwork.component.html',
  styleUrls: ['./vr-artwork.component.less']
})
export class VrArtworkComponent implements OnInit {

  constructor(
    private inquireService: InquireService,
    private cookie: CookieService,
  ) {}

  @Input() artwork: Artwork;

  @Input() imageClass: string;

  @ViewChild(SmartImageComponent) image: SmartImageComponent;

  ngOnInit() {
  }

  inquire() {
    const data: ContactFormData = {
      email: this.cookie.get('email'),
      message: this.artwork.title,
      name: this.cookie.get('name'),
      artwork: this.artwork,
    };
    this.inquireService.openContactModal(data);
  }
}
