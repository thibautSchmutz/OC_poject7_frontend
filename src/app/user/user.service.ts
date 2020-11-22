import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { User } from './model/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public currentUser$ = new Subject<User>();

  constructor(private http: HttpClient) {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.getCurrentUser(userId);
    } else {
      this.currentUser$.next({
        imageUrl: `${environment.Url}/images/Photo-profil-générique.png1605702446100.png`,
      });
    }
  }

  getCurrentUser(userId: string) {
    this.http
      .get<User>(`${environment.apiUrl}/users/${userId}`)
      .subscribe((user) => this.currentUser$.next(user));
  }
}
