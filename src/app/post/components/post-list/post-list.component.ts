import { Component, OnInit } from '@angular/core';
import { PostService } from '../../post.service';
import { Post } from '../../post';
import { Router } from '@angular/router';
import { groupBy, map } from 'rxjs/operators';
import { UserState } from 'src/app/user/model/user';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit {
  public user: UserState;
  public posts: Post[];

  constructor(
    private userService: UserService,
    private postService: PostService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userService.userState$.subscribe((res) => (this.user = res));

    this.postService.getAllPosts();

    this.postService.allPosts$
      .pipe(
        map((lessons) =>
          lessons.sort(
            (a, b) =>
              new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
          )
        )
      )
      .subscribe((posts) => {
        this.posts = posts;
      });
  }
}
