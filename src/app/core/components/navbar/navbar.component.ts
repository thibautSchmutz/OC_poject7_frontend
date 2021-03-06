import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
// Services
import { AuthService } from '../../services/auth.service';
import { UserService } from 'src/app/user/services/user.service';
// RxJS
import { pluck } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  @ViewChild('submenu') submenu: ElementRef<HTMLInputElement>;

  public isAuth: boolean;
  public userImage: string;

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.authService.isAuth$.subscribe((res) => (this.isAuth = res));
    this.userService.userState$
      .pipe(pluck('currentUser', 'imageUrl'))
      .subscribe((res) => (this.userImage = res));
  }

  openSubMenu() {
    if (this.submenu.nativeElement.style.display === 'block') {
      this.submenu.nativeElement.style.display = 'none';
    } else {
      this.submenu.nativeElement.style.display = 'block';
    }
  }

  logout() {
    this.authService.logout();
  }
}
