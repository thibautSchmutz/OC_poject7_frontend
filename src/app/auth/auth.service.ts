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
  public isAuthBS$ = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient,
    private localstorageService: LocalstorageService
  ) {
    // Aller chercher le token dans localstorage et changer la valeur de isAuth$ s'il y en a un
    if (localStorage.getItem('token')) {
      // Ajout d'appel serveur vérif' token.
      this.isAuthBS$.next(true);
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
          this.isAuthBS$.next(true);
        })
      );
  }
}
