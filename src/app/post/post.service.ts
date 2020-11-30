import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Post } from './post';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  // SUBJECT
  public allPosts$: BehaviorSubject<Post[]> = new BehaviorSubject([]);

  constructor(private http: HttpClient) {
    this.getAllPosts().subscribe(
      (res) => this.allPosts$.next(res),
      (err) => console.log(err)
    );
  }

  getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${environment.apiUrl}/posts`);
  }

  addNewPost(postInfo): Observable<Post> {
    return this.http.post<Post>(`${environment.apiUrl}/posts/new`, postInfo);
  }

  deletePost(postId: number) {
    return this.http.delete(
      `${environment.apiUrl}/posts/delete/${postId.toString()}`
    );
  }

  // STATE MANAGEMENT
  updatePostState() {
    this.getAllPosts().subscribe((posts) => this.allPosts$.next(posts));
  }
}
