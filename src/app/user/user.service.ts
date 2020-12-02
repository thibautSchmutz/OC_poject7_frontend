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
  // CURRENT USER
  public currentUser: User;
  // ADMIN
  public admin: boolean = false;

  constructor(private http: HttpClient) {
    // Initialisation pour éviter les problèmes de loading (asynchrone)
    this.currentUser = {
      imageUrl: '',
    };
  }

  getCurrentUser(userId: string) {
    this.http
      .get<User>(`${environment.apiUrl}/users/${userId}`)
      .subscribe((user) => (this.currentUser = user));
  }

  clearCurrentUser() {
    this.currentUser = {};
  }
}
