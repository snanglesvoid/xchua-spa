import { Component, OnInit, Input } from "@angular/core";
import { Post } from "src/app/models/Post";
import { LanguageService } from "src/app/services/language.service";

@Component({
  selector: "app-post",
  templateUrl: "./post.component.html",
  styleUrls: ["./post.component.less"]
})
export class PostComponent implements OnInit {
  @Input() post: Post;

  constructor(public lang: LanguageService) {}

  ngOnInit() {}
}
