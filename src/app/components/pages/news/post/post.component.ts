import {Component, OnInit, Input, ElementRef, HostBinding} from '@angular/core';
import {Post} from 'src/app/models/Post';
import {LanguageService} from 'src/app/services/language.service';
import {ClientService} from 'src/app/services/client.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.less']
})
export class PostComponent implements OnInit {
  @Input() post: Post;

  constructor(public lang: LanguageService, private el: ElementRef<HTMLDivElement>, private client: ClientService) {}

  @HostBinding('class.small')
  public get isSmall() {
    return this.el.nativeElement.getBoundingClientRect().width <= this.client.sizeMd;
  }

  ngOnInit() {}
}
