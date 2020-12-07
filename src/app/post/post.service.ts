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
  // POST STATE
  private allPosts: BehaviorSubject<Post[]> = new BehaviorSubject([]);
  // POST STATE OBSERVABLE
  public allPosts$ = this.allPosts.asObservable();
  // POST STATE UPDATE
  updatePostState(state) {
    this.allPosts.next(state);
  }

  constructor(private http: HttpClient, private authService: AuthService) {}

  getAllPosts() {
    this.http.get<Post[]>(`${environment.apiUrl}/posts`).subscribe((res) => {
      this.updatePostState(res);
    });
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
}
