import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Post } from './post';
import { AuthService } from '../core/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  // SUBJECT
  private allPosts$: BehaviorSubject<Post[]> = new BehaviorSubject([]);
  public allPosts = this.allPosts$.asObservable();

  constructor(private http: HttpClient, private authService: AuthService) {
    this.updateAllPostsState();
  }

  getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${environment.apiUrl}/posts`);
  }

  updateAllPostsState() {
    this.getAllPosts().subscribe(
      (res) => {
        this.allPosts$.next(res);
      },
      (err) => console.log(err)
    );
  }

  addNewPost(postInfo): Observable<Post> {
    return this.http.post<Post>(`${environment.apiUrl}/posts/new`, postInfo);
  }

  deletePost(postId: number) {
    return this.http.delete(
      `${environment.apiUrl}/posts/delete/${postId.toString()}`
    );
  }

  addLike(postId, userId) {
    return this.http.post(
      `${environment.apiUrl}/likes/${postId.toString()}/${userId}/new`,
      null,
      { responseType: 'text' }
    );
  }

  removeLike(postId: number, userId) {
    return this.http.delete(
      `${environment.apiUrl}/likes/${postId.toString()}/${userId}/delete`,
      { responseType: 'text' }
    );
  }

  // STATE MANAGEMENT
  updatePostState() {
    this.getAllPosts().subscribe((posts) => this.allPosts$.next(posts));
  }
}
