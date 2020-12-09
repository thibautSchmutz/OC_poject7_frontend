import { Component, OnInit } from '@angular/core';
import { UserState } from '../../model/user';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent implements OnInit {
  public user: UserState;
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.userState$.subscribe((res) => {
      this.user = res;
      console.log(this.user);
    });
  }
}
