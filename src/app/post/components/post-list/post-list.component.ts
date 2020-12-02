import { Component, OnInit } from '@angular/core';
import { PostService } from '../../post.service';
import { Post } from '../../post';
import { Router } from '@angular/router';
import { groupBy, map } from 'rxjs/operators';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit {
  public posts: Post[];

  constructor(private postService: PostService, private router: Router) {}

  ngOnInit(): void {
    this.postService.allPosts
      .pipe(
        map((lessons) =>
          lessons.sort(
            (a, b) =>
              new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
          )
        )
      )
      .subscribe((posts) => (this.posts = posts));
  }
}
