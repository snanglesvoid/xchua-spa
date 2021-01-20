import {Component, OnInit, OnDestroy} from '@angular/core';
import {ApiService} from 'src/app/services/api.service';
import {ViewingRoom} from 'src/app/models/ViewingRoom';
import {Observable, of} from 'rxjs';
import {map, tap} from 'rxjs/operators';

@Component({
  selector: 'app-viewing-rooms',
  templateUrl: './viewing-rooms.component.html',
  styleUrls: ['./viewing-rooms.component.less']
})
export class ViewingRoomsComponent implements OnInit, OnDestroy {
  private dataChangeSubscription: any;
  loading = true;

  viewingRooms: ViewingRoom[];
  viewingRooms$: Observable<ViewingRoom[]>;

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.dataChangeSubscription = this.api.viewingRooms.dataChanged.subscribe(
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
    this.loading = true;
    await this.api.viewingRooms.waitForData();
    this.viewingRooms = this.api.viewingRooms.data;
    this.viewingRooms$ = of(this.viewingRooms).pipe(
      map((vrs) => vrs.map(vr => {
        if (vr.thumbnail) {
          return vr;
        } else {
          const title = vr.blocks.find(x => x.type === 'Title Image');
          if (title) {
            vr.thumbnail = title.image;
            return vr;
          }
        }
      })),
      tap(console.log)
    );
    this.loading = false;
  }
}
