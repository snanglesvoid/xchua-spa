import { Component, OnInit } from '@angular/core'
import { ApiService } from 'src/app/services/api.service'
import { Post } from 'src/app/models/Post'
import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger,
} from '@angular/animations'

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.less'],
  animations: [
    trigger('listAnimation', [
      transition('* => *', [
        query(
          ':leave',
          [stagger(500, [animate('1s', style({ opacity: 0 }))])],
          { optional: true }
        ),
        query(
          ':enter',
          [
            style({ opacity: 0 }),
            stagger(500, [animate('1s', style({ opacity: 1 }))]),
          ],
          { optional: true }
        ),
      ]),
    ]),
  ],
})
export class NewsComponent implements OnInit {
  private _dataChangeSubscription
  posts: Post[] = []
  loading: boolean = true

  constructor(public api: ApiService) {}

  ngOnInit() {
    this._dataChangeSubscription = this.api.news.dataChanged.subscribe(() => {
      this.updateData()
    })
    this.updateData()
  }

  async updateData() {
    this.loading = true
    await this.api.news.waitForData()
    this.posts = this.api.news.data
    // console.log(this.posts)
    this.loading = false
  }
}
