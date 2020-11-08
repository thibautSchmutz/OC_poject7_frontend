import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from './post';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}

  getAllPosts(): Observable<Post[]> {
    const token = localStorage.getItem('token');

    return this.http.get<Post[]>(`${environment.apiUrl}/posts`);

    // AVEC HEADERS EN DUR = CA MARCHE
    // return this.http.get<Post[]>(`${environment.apiUrl}/posts`, {
    //   headers: { Authorization: token },
    // });
  }
}
