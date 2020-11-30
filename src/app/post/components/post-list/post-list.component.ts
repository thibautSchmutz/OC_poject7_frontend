import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { PostService } from '../../post.service';
import { Post } from '../../post';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit, OnDestroy {
  public posts: Post[];

  constructor(private postService: PostService, private router: Router) {}

  ngOnInit(): void {
    this.postService.getAllPosts().subscribe((res) => (this.posts = res));
    // this.postService.callPosts$.subscribe((posts) => (this.posts = posts));
  }

  ngOnDestroy(): void {
    this.postService.allPosts$.unsubscribe();
  }
}
