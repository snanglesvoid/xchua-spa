import { Component, OnInit, Input } from "@angular/core";
import { ArtworkSeries } from "src/app/models/ArtworkSeries";

@Component({
  selector: "app-artwork-series-card",
  templateUrl: "./artwork-series-card.component.html",
  styleUrls: ["./artwork-series-card.component.less"]
})
export class ArtworkSeriesCardComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  @Input() series: ArtworkSeries;

  public get images() {
    return this.series.artworks.map(x => x.image);
  }
}
