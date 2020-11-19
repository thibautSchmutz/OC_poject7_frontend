import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PostService } from '../../post.service';
import { AuthService } from '../../../core/services/auth.service';
import { Post } from '../../post';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit {
  public posts$: Observable<Post[]>;

  constructor(private postService: PostService, private router: Router) {}

  ngOnInit(): void {
    this.posts$ = this.postService.getAllPosts();
  }
}
