import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserService } from 'src/app/user/user.service';
import { User } from '../../user/model/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // USER AUTH
  public isAuth$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private userService: UserService) {
    // SESSION PERSIST
    // Si un token est présent dans le localStorage, on passe la valeur "true" à isAuth$
    if (localStorage.getItem('token')) {
      this.isAuth$.next(true);
      this.userService.getCurrentUser(localStorage.getItem('userId'));
    }
  }

  // LOGIN
  login(userInfos): Observable<{ userId: string; token: string }> {
    return this.http
      .post<{ userId: string; token: string }>(
        `${environment.apiUrl}/users/login`,
        userInfos
      )
      .pipe(
        tap((res) => {
          if (res.userId == '1') {
            this.userService.admin = true;
          }
          // this.user_id = res.userId;
          localStorage.setItem('userId', res.userId);
          localStorage.setItem('token', `Bearer ${res.token}`);
          this.userService.getCurrentUser(res.userId);
          this.isAuth$.next(true);
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
    this.isAuth$.next(false);
    localStorage.clear();
    this.userService.clearCurrentUser();
    this.userService.admin = false;
  }
}
