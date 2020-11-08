import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isAuth$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  login(userInfos) {
    return this.http.post(`${environment.apiUrl}/users/login`, userInfos);
  }
}
