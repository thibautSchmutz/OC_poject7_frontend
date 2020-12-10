import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { UserState } from 'src/app/user/model/user';
import { UserService } from 'src/app/user/services/user.service';

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

    // Initialisation pour les débuts de session
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
