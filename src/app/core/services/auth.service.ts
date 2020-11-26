import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserService } from 'src/app/user/user.service';
import { User } from '../../user/model/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // USER AUTH
  // BehaviorSubject car initialisation à la valeur "false"
  public isAuth$ = new BehaviorSubject<boolean>(false);

  // USER_ID
  public user_id: string;

  // ADMIN
  public admin: boolean = false;

  constructor(private http: HttpClient, private userService: UserService) {
    // SESSION PERSIST
    // Si un token est présent dans le localStorage, on passe la valeur "true" à isAuth$
    if (localStorage.getItem('token')) {
      this.isAuth$.next(true);
      this.user_id = localStorage.getItem('userId');
    }
  }

  // LOGIN
  // Appel serveur pour authentification
  // Vérification si c'est l'admin
  // Stockage id + token en localstorage
  // Passer une nouvelle valeur au stream du BS isAuth$
  // Initialisation de la propriété urrentUser$ dans le userService
  login(userInfos): Observable<{ userId: string; token: string }> {
    return this.http
      .post<{ userId: string; token: string }>(
        `${environment.apiUrl}/users/login`,
        userInfos
      )
      .pipe(
        tap((res) => {
          if (res.userId == '1') {
            this.admin = true;
          }
          this.user_id = res.userId;
          localStorage.setItem('userId', res.userId);
          localStorage.setItem('token', `Bearer ${res.token}`);
          this.isAuth$.next(true);
          this.userService.getCurrentUser(res.userId);
        })
      );
  }

  // SIGNUP
  // Appel serveur pour inscription
  signup(userInfos): Observable<User> {
    return this.http.post<User>(
      `${environment.apiUrl}/users/signup`,
      userInfos
    );
  }
}
