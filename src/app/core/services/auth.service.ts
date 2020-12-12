import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// ENV
import { environment } from '../../../environments/environment';
// Models
import { Auth } from '../models/auth';
import { User } from '../../user/model/user';
// Services
import { UserService } from 'src/app/user/services/user.service';
// RxJS
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // AUTHSTATE
  private isAuth = new BehaviorSubject<boolean>(false);

  // GET AUTHSTATE
  public isAuth$ = this.isAuth.asObservable();

  // UPDATE AUTHSTATE
  public updateAuthState(bool: boolean) {
    this.isAuth.next(bool);
  }

  constructor(private http: HttpClient, private userService: UserService) {
    // SESSION PERSIST
    if (localStorage.getItem('token')) {
      this.updateAuthState(true);
      this.userService.initializeUserState(localStorage.getItem('userId'));
    }
  }

  // LOGIN
  login(userInfos): Observable<Auth> {
    return this.http
      .post<Auth>(`${environment.apiUrl}/users/login`, userInfos)
      .pipe(
        tap((res) => {
          localStorage.setItem('userId', res.userId);
          localStorage.setItem('token', `Bearer ${res.token}`);
          this.userService.initializeUserState(res.userId);
          this.updateAuthState(true);
        })
      );
  }

  // SIGNUP
  signup(userInfos): Observable<User> {
    return this.http.post<User>(
      `${environment.apiUrl}/users/signup`,
      userInfos
    );
  }

  // LOGOUT
  logout() {
    this.updateAuthState(false);
    localStorage.clear();
    this.userService.updateUserState({
      currentUser: {
        imageUrl: '',
      },
      admin: false,
    });
  }
}
