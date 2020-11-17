import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { LocalstorageService } from '../core/services/localstorage.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isAuth$ = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient,
    private localstorageService: LocalstorageService
  ) {
    // Si un token est présent dans le localStorage,
    // On passe la valeur "true" à isAuth$
    if (localStorage.getItem('token')) {
      this.isAuth$.next(true);
    }
  }

  login(userInfos): Observable<{ userId: string; token: string }> {
    return this.http
      .post<{ userId: string; token: string }>(
        `${environment.apiUrl}/users/login`,
        userInfos
      )
      .pipe(
        tap((res) => {
          this.localstorageService.set('userId', res.userId);
          this.localstorageService.set('token', `Bearer ${res.token}`);
          this.isAuth$.next(true);
        })
      );
  }

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
