import { Component, OnInit, OnDestroy } from "@angular/core";
import { ApiService } from "src/app/services/api.service";

import {
  trigger,
  state,
  transition,
  style,
  query,
  animate
} from "@angular/animations";
import { Exhibition } from "src/app/models/Exhibition";
import { GallerySpace } from "src/app/models/GallerySpace";
import { Observable, interval, of, from } from "rxjs";
import { scan, map, takeWhile } from "rxjs/operators";

@Component({
  selector: "app-exhibitions",
  templateUrl: "./exhibitions.component.html",
  styleUrls: ["./exhibitions.component.less"],
  animations: []
})
export class ExhibitionsComponent implements OnInit, OnDestroy {
  private dataChangeSubscription;
  loading = true;

  exhibitions: Exhibition[] = [];
  stream: Observable<Exhibition[]>;

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.dataChangeSubscription = this.api.exhibitions.dataChanged.subscribe(
      () => {
        this.updateData();
      }
    );
    setTimeout(() => {
      this.updateData();
    }, 50);
  }

  ngOnDestroy() {
    this.dataChangeSubscription.unsubscribe();
  }

  async updateData() {
    this.loading = false;
    if (this.stream) {
      this.stream = of(null);
    }
    await this.api.exhibitions.waitForData();

    this.exhibitions = this.api.exhibitions.data;

    this.stream = of(this.exhibitions);

    // this.stream = interval(500)
    //   .pipe(takeWhile(x => x < this.exhibitions.length))
    //   .pipe(map(x => this.exhibitions[x]))
    //   .pipe(scan<any>((acc, value) => [...acc, value],[]))
    // this.stream = of(this.exhibitions)

    this.stream.subscribe(x => {
      if (x.length == this.exhibitions.length) {
        this.loading = false;

        setTimeout(() => window.scrollTo(0, 1), 150);
      }
    });
  }
}
