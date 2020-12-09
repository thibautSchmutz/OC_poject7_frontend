import { Component, OnInit } from '@angular/core';
import { UserState } from '../../model/user';
import { UserService } from '../../user.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../../../core/components/modal/modal.component';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent implements OnInit {
  public user: UserState;
  constructor(private userService: UserService, private matDialog: MatDialog) {}

  ngOnInit(): void {
    this.userService.userState$.subscribe((res) => {
      this.user = res;
      console.log(this.user);
    });
  }

  editAccount() {
    this.matDialog.open(ModalComponent, {
      data: { editPost: true },
      panelClass: 'custom-dialog-container',
    });
  }

  editPassword() {
    this.matDialog.open(ModalComponent, {
      data: { editPassword: true },
      panelClass: 'custom-dialog-container',
    });
  }
}
