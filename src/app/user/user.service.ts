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
  public currentUser: User;

  constructor(private http: HttpClient) {}

  getCurrentUser(userId: string) {
    this.http
      .get<User>(`${environment.apiUrl}/users/${userId}`)
      .subscribe((user) => (this.currentUser = user));
  }

  clearCurrentUser() {
    this.currentUser = {};
  }
}
