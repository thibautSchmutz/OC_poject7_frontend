import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  public isAuth$: BehaviorSubject<boolean>;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.isAuth$ = this.authService.isAuthBS$;
    // this.authService.isAuth$.subscribe((val) => (this.isAuth = val));
  }

  logout() {
    localStorage.clear();
    this.isAuth$.next(false);
  }
}
