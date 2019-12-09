import { Component, OnInit, ViewChild } from "@angular/core";
import { ApiService } from "src/app/services/api.service";
import { Artist, Artwork, CloudinaryImage } from "src/app/models";
import {
  style,
  animate,
  state,
  transition,
  trigger
} from "@angular/animations";
import { ScrollpaneComponent } from "../../layout/scrollpane/scrollpane.component";
import { ClientService } from "src/app/services/client.service";
import { ImageSize } from "../../common/smart-image/smart-image.component";

@Component({
  selector: "app-artists",
  templateUrl: "./artists.component.html",
  styleUrls: ["./artists.component.less"],
  animations: [
    trigger("linkEnter", [
      state("in", style({ opacity: 1 })),
      transition(":enter", [
        style({ opacity: 0, transform: "translateX(-100%)" }),
        animate(
          "200ms {{delay}} ease-out",
          style({
            opacity: 1,
            transform: "translateX(0)"
          })
        )
      ])
    ])
  ]
})
export class ArtistsComponent implements OnInit {
  residentArtists: Artist[] = [];
  guestArtists: Artist[] = [];
  artists: Artist[] = [];
  previewPictures: CloudinaryImage[] = [];
  previewImage?: CloudinaryImage;
  loading = true;

  @ViewChild(ScrollpaneComponent) scrollpane: ScrollpaneComponent;

  constructor(private api: ApiService, private client: ClientService) {}

  private _dataChangeSubscription;
  ngOnInit() {
    this._dataChangeSubscription = this.api.artists.dataChanged.subscribe(
      () => {
        this.updateData();
      }
    );
    this.updateData();

    setTimeout(() => (this.showPreview = !this.client.isMobile), 2000);
  }

  showPreview;

  ngOnDestroy() {
    this._dataChangeSubscription.unsubscribe();
  }

  async updateData() {
    this.loading = true;
    await this.api.artists.waitForData();
    this.residentArtists = this.api.artists.data.filter(
      x => x.artistType === "resident"
    );
    this.guestArtists = this.api.artists.data.filter(
      x => x.artistType === "guest"
    );
    this.artists = [...this.residentArtists, ...this.guestArtists];
    this.previewPictures = this.artists.map(x => this.artistImage(x));
    this.loading = false;
  }

  artistMouseover(artist: Artist) {
    let i = this.artists.indexOf(artist);
    this.previewImage = this.previewPictures[i];
  }

  artistImage(artist: Artist): CloudinaryImage {
    if (artist.selectedWork) {
      let w = artist.selectedWork;
      if (typeof w === "string") {
        //todo populate
      } else {
        w = w as Artwork;
        return w.image.exists ? w.image : undefined;
      }
    } else if (artist.thumbnail.exists) {
      return artist.thumbnail;
    } else {
      return undefined;
    }
  }

  linkEnter(index) {
    return { value: "in", params: { delay: index * 50 + "ms" } };
  }

  allAnimationsDone(index) {
    // if (index == this.residentArtists.length - 1) {
    //   this.scrollpane.showLines = true
    // }
  }

  progress: any = {
    ratio: 0
  };

  progressChanged(event) {
    // console.log('progress changed ', event)
    this.progress.ratio = event.ratio;
    if (event.ratio >= 1) {
      if (!this.previewImage) {
        this.previewImage = this.previewPictures[0];
      }
      setTimeout(() => {
        this.progress.done = true;
      }, 600);
    }
  }

  previewImageSize: ImageSize = ImageSize.HALFSCREEN;
}
