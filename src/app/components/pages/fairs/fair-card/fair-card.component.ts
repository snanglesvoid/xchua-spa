import {
  Component,
  OnInit,
  Input,
  HostBinding,
  ElementRef
} from "@angular/core";
import { Fair, CloudinaryImage } from "src/app/models";
import { LanguageService } from "src/app/services/language.service";
import { ClientService } from "src/app/services/client.service";

@Component({
  selector: "app-fair-card",
  templateUrl: "./fair-card.component.html",
  styleUrls: ["./fair-card.component.less"]
})
export class FairCardComponent implements OnInit {
  constructor(
    public lang: LanguageService,
    private el: ElementRef<HTMLDivElement>,
    private client: ClientService
  ) {}

  ngOnInit() {
    this.images = [...this.fair.pictures, this.fair.thumbnail];
    this.image = this.images[0];
    this.fair.thumbnail.imageFit = this.fair.thumbnailImageFit;
  }

  @Input() fair: Fair;

  images: CloudinaryImage[] = [];
  image?: CloudinaryImage;

  progress: any = {
    ratio: 0
  };

  progressChanged(event) {
    // console.log("progress changed ", event);
    this.progress.ratio = event.ratio;
    if (event.ratio >= 1) {
      setTimeout(() => {
        // if (!this.image) {
        //   this.image = this.images[0]
        // }
        this.progress.done = true;
      }, 500);
    }
  }

  @HostBinding("class.small")
  public get isSmall() {
    return (
      this.el.nativeElement.getBoundingClientRect().width <= this.client.sizeMd
    );
  }

  slideChanged($event) {
    console.log("slide changed", $event);
    console.log(this.images.map(x => x.animationState.fade.value));
  }
}
