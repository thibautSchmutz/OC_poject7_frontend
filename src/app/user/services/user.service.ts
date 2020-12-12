import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { User } from '../model/user';
import { UserState } from '../model/user';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // USERSTATE
  private userState: BehaviorSubject<UserState> = new BehaviorSubject<UserState>(
    {
      currentUser: {
        imageUrl: '',
      },
      admin: false,
    }
  );
  // USERSTATE OBSERVABLE
  public userState$ = this.userState.asObservable();
  //UPDATE USERSTATE
  public updateUserState(state: UserState) {
    this.userState.next(state);
  }

  constructor(private http: HttpClient) {}

  initializeUserState(userId: string) {
    this.http
      .get<User>(`${environment.apiUrl}/users/${userId}`)
      .subscribe((user) => {
        const admin = user.id.toString() === '1';
        this.updateUserState({
          currentUser: { ...user },
          admin,
        });
      });
  }

  editAccount(form: FormData, user_id) {
    return this.http.put(`${environment.apiUrl}/users/${user_id}/update`, form);
  }

  editPassword(form, user_id) {
    return this.http.put(
      `${environment.apiUrl}/users/${user_id}/update-password`,
      form
    );
  }

  deleteAccount(user_id) {
    return this.http.delete(`${environment.apiUrl}/users/${user_id}/delete`);
  }
}
