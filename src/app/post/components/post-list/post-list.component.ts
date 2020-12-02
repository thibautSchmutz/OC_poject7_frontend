import { Component, OnInit } from '@angular/core';
import { PostService } from '../../post.service';
import { Post } from '../../post';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit {
  public posts: Post[];

  constructor(private postService: PostService, private router: Router) {}

  ngOnInit(): void {
    this.postService.allPosts.subscribe((posts) => (this.posts = posts));
  }
}
