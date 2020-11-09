import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PostService } from '../../post.service';
import { AuthService } from '../../../auth/auth.service';
import { Post } from '../../post';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit {
  public posts$: Observable<Post[]>;

  constructor(
    private postService: PostService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Si le user n'est pas authentifié, on le redirige vers la page de connexion
    // Sinon, on charge les posts dans un observable et on subscribe dans le template via le pipe async
    if (!this.authService.isAuthBS$.value) {
      this.router.navigate(['connect']);
    } else {
      this.posts$ = this.postService.getAllPosts();
    }
  }
}
