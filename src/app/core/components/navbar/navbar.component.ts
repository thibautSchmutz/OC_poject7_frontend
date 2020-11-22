import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, pipe, Subject, Subscription } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { User } from 'src/app/user/model/user';
import { UserService } from 'src/app/user/user.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  public isAuth$: BehaviorSubject<boolean>;
  public userImage$: Observable<string>;

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.isAuth$ = this.authService.isAuth$;
    this.userImage$ = this.userService.currentUser$.pipe(pluck('imageUrl'));
  }

  logout() {
    localStorage.clear();
    this.isAuth$.next(false);
  }
}
