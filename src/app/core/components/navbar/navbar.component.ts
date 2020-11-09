import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  public isAuth: boolean;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.isAuth$.subscribe((bool) => (this.isAuth = bool));
  }

  logout() {
    localStorage.clear();
    this.authService.isAuth$.next(false);
  }
}
