import { Component, OnInit } from '@angular/core'
import { ApiService } from 'src/app/services/api.service'
import { Fair } from 'src/app/models'
import {
  trigger,
  query,
  style,
  animate,
  transition,
  stagger,
} from '@angular/animations'
import { LanguageService } from 'src/app/services/language.service'

@Component({
  selector: 'app-fairs',
  templateUrl: './fairs.component.html',
  styleUrls: ['./fairs.component.less'],
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({ opacity: 0.0 }),
        animate('1s ease', style({ opacity: 1.0 })),
      ]),
    ]),
    trigger('listAnimation', [
      transition('* <=> *', [
        query(
          ':enter',
          [
            style({ opacity: 0.0 }),
            stagger(250, [animate('2s ease', style({ opacity: 1.0 }))]),
          ],
          { optional: true }
        ),
      ]),
    ]),
  ],
})
export class FairsComponent implements OnInit {
  constructor(private api: ApiService, public lang: LanguageService) {}

  fairs: Promise<Fair[]>

  ngOnInit() {
    this.fairs = this.api.fairs.waitForData()
  }
}
