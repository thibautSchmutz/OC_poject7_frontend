import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { LocalstorageService } from '../core/services/localstorage.service';
import { BehaviorSubject } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isAuth$ = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient,
    private localstorageService: LocalstorageService
  ) {}

  login(userInfos) {
    return this.http.post(`${environment.apiUrl}/users/login`, userInfos).pipe(
      tap((res) => {
        this.localstorageService.set('userId', res['userId']);
        this.localstorageService.set('token', res['token']);
      })
    );
  }
}
