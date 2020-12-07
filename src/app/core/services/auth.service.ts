import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserService } from 'src/app/user/user.service';
import { User } from '../../user/model/user';
import { IsAuthGuard } from '../guards/is-auth.guard';

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
  login(userInfos): Observable<{ userId: string; token: string }> {
    return this.http
      .post<{ userId: string; token: string }>(
        `${environment.apiUrl}/users/login`,
        userInfos
      )
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
