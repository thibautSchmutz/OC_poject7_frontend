import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { LocalstorageService } from '../services/localstorage.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // USER AUTH - BS
  public isAuth$ = new BehaviorSubject<boolean>(false);

  // USER_ID
  public user_id: string;

  // ADMON
  public admin: boolean = false;

  constructor(private http: HttpClient) {
    // Si un token est présent dans le localStorage, on passe la valeur "true" à isAuth$
    if (localStorage.getItem('token')) {
      this.isAuth$.next(true);
      this.user_id = localStorage.getItem('userId');
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
          this.isAuth$.next(true);
        })
      );
  }

  // SIGNUP
  signup(
    userInfos
  ): Observable<{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    imageUrl?: string;
  }> {
    return this.http.post<{
      firstName: string;
      lastName: string;
      email: string;
      password: string;
      imageUrl?: string;
    }>(`${environment.apiUrl}/users/signup`, userInfos);
  }
}
